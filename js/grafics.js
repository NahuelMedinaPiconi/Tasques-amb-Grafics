import { getFinishedTasksGraph } from "./storage.js";

export function printGraph(actualChart, ctx) {

    const finishedTasks = getFinishedTasksGraph();

    if (actualChart != null) {
        actualChart.destroy();
    }

    actualChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Ener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juni', "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Desembre"],
        datasets: [{
            label: 'Tasques realitzades',
            data: finishedTasks,
            backgroundColor: finishedTasks.map((_, i) => 
                i === new Date().getMonth() ? '#3b82f6' : '#93c5fd'
            ),
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
                }
            }
        }
    })

    return actualChart;
}