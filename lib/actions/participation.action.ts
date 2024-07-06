"use server";

import { RowDataPacket } from "mysql2";
import getConnection, { myCreatePool } from "../db";
import { Pool, PoolConnection } from "mysql2/promise";

type ParticipationCount = {
  date: string;
  status: string;
  count: number;
};

export type ParticipationCounts = {
  Remis: number[];
  "Non Remis": number[];
  "En Attente": number[];
  Annule: number[];
};
let pool: Pool | null = null;
let connection: PoolConnection | null = null; // Déclarer une variable pour la connexion

export const createPoolConnection = async () => {
  try {
    pool = await myCreatePool(); // Appel de votre fonction pour créer le pool de connexions
    connection = await pool.getConnection();
  } catch (error) {
    console.error("Erreur lors de la création du pool de connexions:", error);
    throw error;
  }
};

// Appeler la fonction de création de pool au démarrage de l'application


export const getParticipationCounts = async (limit: number) => {
  try {
    await createPoolConnection()
    if (!pool || !connection) {
      throw new Error('Le pool de connexions MySQL n\'est pas encore initialisé.');
    }
    const [rows] = await pool.query<(ParticipationCount & RowDataPacket)[]>(
      `SELECT DATE(participationDate) as date, 
                status, 
                COUNT(*) as count
         FROM Participation
         WHERE participationDate BETWEEN '2024-07-01' AND '2024-07-31'
         GROUP BY DATE(participationDate), status
         ORDER BY DATE(participationDate)`
    );

    const counts: ParticipationCounts = {
      Remis: Array(31).fill(0),
      "Non Remis": Array(31).fill(0),
      "En Attente": Array(31).fill(0),
      Annule: Array(31).fill(0),
    };

    rows.forEach((row: ParticipationCount) => {
      const day = new Date(row.date).getDate() - 1; // Get day of the month (0-based index)
      counts[row.status as keyof ParticipationCounts][day] = row.count;
    });

    console.log("==== ", counts.Annule.length, counts["En Attente"].length, counts["Non Remis"].length, counts.Remis.length);
    return counts;
  } catch (error) {
    console.error("Database query failed", error);
  } finally {
    if (connection) {
      connection.release(); // Libérer la connexion après usage
    }
    if (pool) {
      await pool.end(); // Terminer le pool de connexions
    }
  }
};
