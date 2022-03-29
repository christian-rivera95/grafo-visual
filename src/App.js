import "./App.css";
import { Graphviz } from "graphviz-react";
import React from "react";
import Button from "@mui/material/Button";

function App() {
  const [graph, setGraph] = React.useState("");
  const [vertexSet, setVertexSet] = React.useState("");
  const [edgeSet, setEdgeSet] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [destino, setDestino] = React.useState("");

  const AddVertex = () => {
    const regex = /(?<=\{)(.*?)(?=\})/g;
    const found = vertexSet.match(regex);

    let object = "";

    if (found) {
      found.forEach((item) => {
        object += item + ";";
      });
      setGraph(graph + object);
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
    findRoute();
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

  const findRoute = () => {
    unPaintEdge();
    const regex = /(?<=\()(.*?)(?=\))/g;
    const found = edgeSet.match(regex);
    const routes = [];

    let ruta = "";
    let pointer = origen;
    let result;

    if (found) {
      found.forEach((item) => {
        const splitEdge = item.split(",");
        if (splitEdge[1] === destino) {
          ruta += `${splitEdge[0]} -- ${splitEdge[1]}[color=red,penwidth=3.0];`;
          pointer = splitEdge[1];
          routes.push(ruta);
          setGraph(graph + ruta);
        }
        if (splitEdge[0] === pointer) {
          pointer = splitEdge[1];
          ruta += `${splitEdge[0]} -- ${splitEdge[1]}[color=red,penwidth=3.0];`;
          const key = splitEdge[1];
          routes.push(ruta);
        } else if (splitEdge[0] === origen) {
          pointer = splitEdge[1];
          ruta = `${splitEdge[0]} -- ${splitEdge[1]}[color=red,penwidth=3.0];`;
          const key = splitEdge[1];
          routes.push(ruta);
        }
      });
    }
    routes.forEach((item) => {
      const foundEdges = item.split(" -- ");
      const arrayLength = foundEdges.length - 1;
      if (
        foundEdges[0][0] === origen &&
        foundEdges[arrayLength][0] === destino
      ) {
        setGraph(graph + item);
        return;
      }
    });
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
  const handleOrigen = (e) => {
    if (e.target.value.length < 45 && e.target.value !== " ") {
      setOrigen(e.target.value);
    }
  };
  const handleDestino = (e) => {
    if (e.target.value.length < 45 && e.target.value !== " ") {
      setDestino(e.target.value);
    }
  };

  React.useEffect(() => {
    console.log(graph);
  }, [graph]);

  return (
    <div className="App">
      <div>
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
      </div>
      <div>
        <input
          style={{ marginRight: "3%" }}
          placeholder="Oriden"
          onChange={(e) => {
            handleOrigen(e);
          }}
        />
        <input
          style={{ marginRight: "2%" }}
          placeholder="Destino"
          onChange={(e) => {
            handleDestino(e);
          }}
        />
        <Button
          onClick={() => {
            findRoute();
          }}
        >
          Mostrar ruta
        </Button>
        <Button
          onClick={() => {
            unPaintEdge();
          }}
        >
          Clear
        </Button>
      </div>

      <Graphviz
        dot={`strict graph {
          ${graph}
      }`}
      />
    </div>
  );
}

export default App;
