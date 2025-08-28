import React from "react";
import { Box } from "@mui/material";
import ApexCharts from "react-apexcharts";
import { productos } from "../producto/Productos";

export default function ProductsPieChart() {
  // Calcular distribución de productos por categoría
  const productsByCategory = productos.reduce((acc, producto) => {
    const categoria = producto.categoria?.nombre || "Sin categoría";
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(productsByCategory);
  const series = Object.values(productsByCategory);
  
  // Calcular porcentajes para la leyenda
  const total = series.reduce((sum, val) => sum + val, 0);
  const percentages = series.map(val => ((val / total) * 100).toFixed(1));

  const options = {
    chart: {
      type: "donut",
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
    labels: categories,
    legend: {
      position: "right",
      fontSize: "14px",
      customLegendItems: categories.map((cat, index) => 
        `${cat} <b>${percentages[index]}%</b>`
      ),
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    title: {
      text: "Productos por Categoría",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333"
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              color: "#333"
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              formatter: function () {
                return total;
              }
            }
          }
        }
      }
    },
    colors: ["#4CAF50", "#2196F3", "#FF9800", "#F44336", "#9C27B0", "#607D8B", "#795548", "#E91E63"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.globals.seriesTotals[opts.seriesIndex];
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold"
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " productos";
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
        animation: "slideInFromBottom 0.8s ease-out 0.9s both",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
        }
      }}
    >
      <ApexCharts
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={350}
      />
    </Box>
  );
}
