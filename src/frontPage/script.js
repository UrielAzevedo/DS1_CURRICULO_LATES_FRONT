import Chart from 'chart.js/auto'
import { Chart } from 'chart.js/dist'

const canvas = document.getElementById('canvasBarChart')

console.log(canvas)

const config = {
    type: "bar",
    data: {
        labels: ['1', '2', '3'],
        datasets: [
            {
                label: "numbers",
                data: [12, 4, 7]
            },
        ]
    }
}

var Chart = new Chart({canvas, config})