

function getResource () {
    function post (url, json) {
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
        return post('/graph', {graph})
    }

    const getGraph = () => {
        return fetch('/graph')
            .then(res => res.json())
    }


    const getBack = () => {
      fetch('/test/read')
        .then(res => res.text())
        .then(data => {
        })
    }
    return {
        saveGraph,
        getGraph
    }
}

const resource = getResource()

export default resource




