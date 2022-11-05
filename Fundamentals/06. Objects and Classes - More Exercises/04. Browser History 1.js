function browserHistory(obj, arr) {
    for (let line of arr) {
        let [command, site] = line.split(" ")
        if (command === "Open") {
            obj["Open Tabs"].push(site);
            obj["Browser Logs"].push(line);
        } else if (command === "Close") {
            if (obj["Open Tabs"].includes(site)) {
                obj["Open Tabs"].splice(obj["Open Tabs"].indexOf(site), 1);
                obj["Recently Closed"].push(site);
                obj["Browser Logs"].push(line);
            }
        } else if (command === "Clear") {
            obj["Open Tabs"] = [];
            obj["Recently Closed"] = [];
            obj["Browser Logs"] = [];
        }
    }
    console.log(obj["Browser Name"]);
    console.log(`Open Tabs: ${obj["Open Tabs"].join(", ")}`);
    console.log(`Recently Closed: ${obj["Recently Closed"].join(", ")}`);
    console.log(`Browser Logs: ${obj["Browser Logs"].join(", ")}`);
}
