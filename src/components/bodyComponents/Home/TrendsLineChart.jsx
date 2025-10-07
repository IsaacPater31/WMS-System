import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ApexCharts from "react-apexcharts";
import { movimientos } from "../movimiento/Movimientos";

export default function TrendsLineChart() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Procesar datos para la gráfica de tendencias
    const processTrendsData = () => {
      // Obtener las últimas 7 fechas únicas
      const dates = [...new Set(movimientos.map(m => m.fecha_movimiento))]
        .sort()
        .slice(-7);

      // Calcular movimientos por día
      const movementsByDay = dates.map(date => {
        const dayMovements = movimientos.filter(m => m.fecha_movimiento === date);
        return dayMovements.length;
      });

      // Calcular ingresos por día (cantidades positivas)
      const ingresosByDay = dates.map(date => {
        const dayMovements = movimientos.filter(m => m.fecha_movimiento === date);
        return dayMovements
          .filter(m => m.cantidad > 0)
          .reduce((sum, m) => sum + Math.abs(m.cantidad), 0);
      });

      // Calcular salidas por día (cantidades negativas)
      const salidasByDay = dates.map(date => {
        const dayMovements = movimientos.filter(m => m.fecha_movimiento === date);
        return dayMovements
          .filter(m => m.cantidad < 0)
          .reduce((sum, m) => sum + Math.abs(m.cantidad), 0);
      });

      setSeries([
        {
          name: "Total Movimientos",
          type: "line",
          data: movementsByDay
        },
        {
          name: "Ingresos",
          type: "line",
          data: ingresosByDay
        },
        {
          name: "Salidas",
          type: "line",
          data: salidasByDay
        }
      ]);
    };

    processTrendsData();
  }, []);

  const options = {
    title: {
      text: "Tendencias de Movimientos",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333"
      }
    },
    subtitle: {
      text: "Actividad del sistema en el tiempo",
      align: "left",
      style: {
        fontSize: "14px",
        color: "#666"
      }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      offsetY: -10
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    theme: {
      mode: "light"
    },
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1
      },
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
    xaxis: {
      categories: [...new Set(movimientos.map(m => m.fecha_movimiento))]
        .sort()
        .slice(-7)
        .map(date => new Date(date).toLocaleDateString('es-ES', { 
          day: '2-digit', 
          month: '2-digit' 
        })),
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: [
      {
        title: {
          text: "Cantidad de Movimientos",
          style: {
            fontSize: "12px"
          }
        },
        labels: {
          style: {
            fontSize: "11px"
          }
        }
      }
    ],
    colors: ["#1976d2", "#388e3c", "#f57c00"],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex === 0) {
            return val + " movimientos";
          } else {
            return val + " unidades";
          }
        }
      }
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3
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
        animation: "slideInFromBottom 0.8s ease-out 1s both",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
        }
      }}
    >
      <ApexCharts
        options={options}
        series={series}
        height={350}
        type="line"
        width="100%"
      />
    </Box>
  );
}
