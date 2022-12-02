function destinationMapper(input) {
    const pattern = /([=\/])(?<place>[A-Z][A-Za-z]{2,})\1/g;
    let travelPoints = 0;
    const destinations = [];
    const matches = Array.from(input.matchAll(pattern));
    matches.forEach((match) => {
        destinations.push(match.groups.place);
        travelPoints += match.groups.place.length;
    });
    console.log(`Destinations: ${destinations.join(", ")}`);
    console.log(`Travel Points: ${travelPoints}`);
}
