google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

export const drawChart = (completeTask, expireTask, pendingTask) => {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Completed', completeTask],
        ['expired', expireTask],
        ['pending', pendingTask]
    ]);

    var options = {
        title: 'Task Details'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}