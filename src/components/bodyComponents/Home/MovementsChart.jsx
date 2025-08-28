import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { Box, Typography } from "@mui/material";
import { movimientos } from "../movimiento/Movimientos";

export default function MovementsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Procesar datos de movimientos para la gráfica
    const processData = () => {
      // Agrupar movimientos por tipo y fecha
      const movementsByType = {};
      const dates = [...new Set(movimientos.map(m => m.fecha_movimiento))].sort().slice(-7); // Últimos 7 días
      
      // Inicializar estructura de datos
      const tipos = ['INGRESO', 'SALIDA', 'TRANSFERENCIA', 'AJUSTE'];
      tipos.forEach(tipo => {
        movementsByType[tipo] = dates.map(date => {
          const count = movimientos.filter(m => 
            m.tipo === tipo && m.fecha_movimiento === date
          ).length;
          return count;
        });
      });

      // Crear series para ApexCharts
      const series = tipos.map(tipo => ({
        name: tipo,
        data: movementsByType[tipo]
      }));

      setChartData(series);
    };

    processData();
  }, []);

  const options = {
    chart: {
      id: "movements-chart",
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      horizontalAlign: "center",
      offsetY: 0,
      fontSize: "12px"
    },
    title: {
      text: "Movimientos por Tipo",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333"
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        horizontal: false,
        borderRadius: 4,
        dataLabels: {
          position: "top"
        }
      }
    },
    fill: {
      opacity: 0.8,
      type: "solid"
    },
    colors: ["#4CAF50", "#F44336", "#FF9800", "#2196F3"],
    xaxis: {
      categories: [...new Set(movimientos.map(m => m.fecha_movimiento))].sort().slice(-7).map(date => 
        new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
      ),
      labels: {
        style: {
          fontSize: "11px"
        }
      }
    },
    yaxis: {
      title: {
        text: "Cantidad de Movimientos",
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val + " movimientos";
        }
      }
    }
  };

  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: 3,
        height: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: "slideInFromBottom 0.8s ease-out 0.8s both",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
        }
      }}
    >
      <ApexCharts
        options={options}
        series={chartData}
        type="bar"
        width="100%"
        height={350}
      />
    </Box>
  );
}
