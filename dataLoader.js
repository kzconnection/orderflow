class DataLoader {
    constructor() {
      this.URL = 'http://127.0.0.1:5000';
    }
  
    async load(callback) {
      let url = `${this.URL}/get-volume-pair`;
      let result = await fetch(url);
      let data = await result.json();
      let imbalanceData = data.map((x) => this.getImbalanceData(x));
      let volumeData = data.map((x) => this.getVolumeSummaryData(x));
      callback({
        indexBased: true,
        panes: [
          {
            settings: {
                scaleTemplate: [[], ["A"]],
                height: 5
            },
            overlays: [
              {
                name: "Imbalances",
                type: "Imbalance",
                main: true,
                data: imbalanceData
              }
            ]
          },
          {
            settings: {
                scaleTemplate: [[], ["A"]],
                height: 1
            },
            overlays: [
              {
                name: "Summary",
                type: "VolumeSummary",
                data: volumeData
              }
            ]
          }
        ]
      });
    }

    getImbalanceData(x) {
        var imbalances = [];
        for(let i = 0; i < x.price.length; i++){
            imbalances.push([x["sell vol"][i], x["buy vol"][i]]);
        }
        return [
            x['open time'],
            parseFloat(x['high']),
            parseFloat(x['low']),
            imbalances,
        ];
    }

    getVolumeSummaryData(x) {
        return [
            x['open time'],
            parseFloat(x['high']),
            parseFloat(x['low']),
            parseFloat(x['high']),
            parseFloat(x['low']),
            parseFloat(x['low'])
        ];
    }

    // getVolumeSummaryData(x) {
    //     return [
    //         x['open time'],
    //         x["delta"],
    //         x["candle buy count"],
    //         x["candle buy volume"],
    //         x["candle sell count"],
    //         x["candle sell volume"]
    //     ];
    // }
  }
  
  export { DataLoader };