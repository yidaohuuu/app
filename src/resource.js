import { saveAs } from 'file-saver'

const noServer = true

function getResource() {
  function post(url, json) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
      .then(res => res.json())
  }

  const saveGraph = (graph) => {
    if (noServer) {
      var blob = new Blob([JSON.stringify(graph)], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "graph.txt");
    } else {
      return post('/graph', { graph })
    }

  }

  const getGraph = (e) => {
    if (noServer) {
      const target = e.target
      const files = target.files
      if (files.length > 0) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
          const graph = JSON.parse(event.target.result)
          target.value = null
          return graph
        }
        reader.readAsText(file)
      }
    } else {
      return fetch('/graph')
        .then(res => res.json())
    }
  }

  return {
    saveGraph,
    getGraph,
  }
}

const resource = getResource()

export default resource




