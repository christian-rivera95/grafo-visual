import "./App.css";
import { Graphviz } from "graphviz-react";
import React from "react";
import Button from "@mui/material/Button";

function App() {
  const [graph, setGraph] = React.useState("");
  const [vertexSet, setVertexSet] = React.useState("");
  const [edgeSet, setEdgeSet] = React.useState("");

  const AddVertex = () => {
    const regex = /(?<=\{)(.*?)(?=\})/g;
    const found = vertexSet.match(regex);

    let object = "";

    if (found) {
      found.forEach((item) => {
        object += item + ";";
      });
      setGraph(graph + object);
      console.log("AddVertex");
    }
  };

  const paintEdge = () => {
    unPaintEdge();
    const regex = /(?<=\()(.*?)(?=\))/g;
    const found = edgeSet.match(regex);
    let object = graph;

    if (found) {
      found.forEach((item) => {
        const splitVertex = item.split(",");
        const vertex =
          splitVertex[0] +
          " -- " +
          splitVertex[1] +
          "[color=red,penwidth=3.0];";
        object += vertex;
      });
      setGraph(object);
    }
  };

  const unPaintEdge = () => {
    const regex = /(?<=\()(.*?)(?=\))/g;
    const found = edgeSet.match(regex);
    let object = graph;

    if (found) {
      found.forEach((item) => {
        const splitVertex = item.split(",");
        const vertex =
          splitVertex[0] +
          " -- " +
          splitVertex[1] +
          "[color=black,penwidth=1.0];";
        object += vertex;
      });
      setGraph(object);
    }
  };

  const AddEdge = () => {
    const regex = /(?<=\()(.*?)(?=\))/g;
    const found = edgeSet.match(regex);

    let object = "";

    if (found) {
      found.forEach((item) => {
        const splitVertex = item.split(",");
        const vertex = splitVertex[0] + " -- " + splitVertex[1];
        object += splitVertex[0] + " -- " + splitVertex[1] + ";";
        setGraph(graph + object);
      });
    }
  };

  const handleVertexChange = (e) => {
    if (e.target.value.length < 45 && e.target.value !== " ") {
      setVertexSet(e.target.value);
    }
  };

  const handleEdgeChange = (e) => {
    if (e.target.value.length < 45 && e.target.value !== " ") {
      setEdgeSet(e.target.value);
    }
  };

  React.useEffect(() => {
    console.log(graph);
  }, [graph]);

  return (
    <div className="App">
      <input
        onChange={(e) => {
          handleVertexChange(e);
        }}
      />
      <Button
        onClick={() => {
          AddVertex();
        }}
      >
        Add Vertex
      </Button>
      <input
        onChange={(e) => {
          handleEdgeChange(e);
        }}
      />
      <Button
        onClick={() => {
          AddEdge();
        }}
      >
        Add Edge
      </Button>
      <Button
        onClick={() => {
          paintEdge();
        }}
      >
        Paint Edge
      </Button>
      <Graphviz
        dot={`strict graph {
          ${graph}
      }`}
      />
    </div>
  );
}

export default App;
