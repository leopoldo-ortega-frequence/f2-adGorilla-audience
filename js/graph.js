// import render from "./graph.js"

// global variables
const drawGraph = () => {
  const container = document.getElementById("slide-content");
  const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 20 };
  const WIDTH = 960 - MARGIN.LEFT - MARGIN.RIGHT;
  const HEIGHT = 420 - MARGIN.TOP - MARGIN.BOTTOM;

  const svg = d3
    .select("#audience-chart")
    .append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

  // create a group element
  const g = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

  d3.json("data/data.json").then((data) => {
    data.forEach((d) => {
      d.audience = +d.audience;
      d.industry = +d.industry;
      d.size = +d.size;
    });
    render(data);
  });

  const render = (data) => {
    const xValue = (d) => d.audience;
    const yValue = (d) => d.industry;

    const areaChartG = g.append("g").attr("height", 400);
    console.log(data);

    // scales
    const xScale = d3.scaleLinear().range([0, WIDTH]).domain([0, 100]);
    const yScale = d3.scaleLinear().range([HEIGHT, 0]).domain([0, 100]);
    const radius = d3
      .scaleLinear()
      .range([10 * Math.PI, 20 * Math.PI])
      .domain([0, 10]);
    const continentColor = d3.scaleOrdinal(d3.schemeTableau10);
    const xLabel = areaChartG
      .append("text")
      .attr("y", 0)
      .attr("x", WIDTH / 2)
      .attr("font-size", "2rem")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("AUDIENCE INTERESTS");
    const yLabel = areaChartG
      .append("text")
      .attr("transform", "rotate(90)")
      .attr("y", -WIDTH)
      .attr("x", HEIGHT / 2)
      .attr("font-size", "2rem")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("INDUSTRY");

    // X Axis
    const xAxisCall = d3.axisTop(xScale);

    //areaChartG.append("g").attr("class", "x axis").call(xAxisCall);

    // Y Axis
    const yAxisCall = d3.axisRight(yScale);
    // areaChartG
    //   .append("g")
    //   .attr("class", "y axis")
    //   .attr("transform", `translate(${WIDTH}, 0)`)
    //   .call(yAxisCall);

    /* Define the data for the circles */
    const elem = areaChartG.selectAll("g myCircleText").data(data);

    /*Create and place the "blocks" containing the circle and the text */
    const elemEnter = elem.enter().append("g");
    // .attr("transform", function (d) {
    //   return "translate(" + d.audience + ",80)";
    // });

    /*Create the circle for each block */
    const circle = elemEnter
      .append("circle")
      .attr("r", function (d) {
        return radius(d.size);
      })
      .attr("fill", "#dbdbdb")
      .attr("stroke-width", "1px")
      .attr("stroke", "#6c6c6c")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)));

    /* Create the text for each block */
    elemEnter
      .append("text")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("x", (d) => xScale(xValue(d)))
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.interest;
      });
  };
};

export { drawGraph };
