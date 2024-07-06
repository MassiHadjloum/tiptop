"use client"

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { mockParticipations } from './mockdataTable';
import { useEffect, useState } from 'react';
import { ParticipationCounts, createPoolConnection, getParticipationCounts } from '@/lib/actions/participation.action';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const ParticipationChart: React.FC = () => {

  const [participationCounts, setParticipationCounts] = useState<ParticipationCounts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   const connexion = async () => {
  //     await createPoolConnection();
  //   }
  //   connexion()
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!participationCounts) {
          setIsLoading(true);
          const counts = await getParticipationCounts(1);
          setParticipationCounts(counts!);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching participation counts:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false); // Assurez-vous que setIsLoading(false) est toujours appelé
      }
    };
    fetchData();
  }, [participationCounts])

  const data = {
    labels: [
      '01/07', '02/07', '03/07', '04/07', '05/07',
      '06/07', '07/07', '08/07', '09/07', '10/07',
      '11/07', '12/07', '13/07', '14/07', '15/07',
      '16/07', '17/07', '18/07', '19/07', '20/07',
      '21/07', '22/07', '23/07', '24/07', '25/07',
      '26/07', '27/07', '28/07', '29/07', '30/07', '31/07'
    ],
    datasets: [
      {
        label: 'EN ATTENTE',
        // data: mockParticipations.filter(p => p.status === 'En Attente').map(p => parseInt(p.participationDate.split('-')[2], 10) * 300),
        data: participationCounts?.['En Attente'],// [1300, 4500, 2000, 5400, 5500, 1200, 7900, 6000, 5500],
        borderColor: 'magenta',
        backgroundColor: 'rgba(255, 0, 255, 0.3)',
        fill: false,
        tension: .1
      },
      {
        label: 'REMIS',
        // data: mockParticipations.filter(p => p.status === 'Remis').map(p => parseInt(p.participationDate.split('-')[2], 10) * 350),
        data: participationCounts?.Remis, // [5300, 2500, 2000, 3400, 7500, 4200, 4900, 3000, 1089],
        borderColor: 'cyan',
        backgroundColor: 'rgba(0, 255, 255, 0.3)',
        fill: false,
        tension: .1
      },
      {
        label: 'ANNULE',
        // data: mockParticipations.filter(p => p.status === 'Annule').map(p => parseInt(p.participationDate.split('-')[2], 10) * 100),
        data: participationCounts?.Annule, // [1300, 1500, 2000, 400, 1800, 1200, 900, 1400, 700],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        fill: false,
        tension: .1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Participation Status Over Time',
      },
    },
  };
  console.log("--- ", isLoading, participationCounts?.Annule.length)

  return (
    !isLoading ?
    <Line data={data} options={options} />
    : <>loading....</>
  );
};

export default ParticipationChart;
