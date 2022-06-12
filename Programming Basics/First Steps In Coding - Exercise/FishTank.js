function FishTank(input) {
    let Lenght = Number(input[0]);
    let Width = Number(input[1]);
    let Height = Number(input[2]);
    let Percent = Number(input[3]);

    let Volume = Lenght * Width * Height; // Kubicheski Santimetri
    let VolumeLiter = Volume / 1000; // Litri
    let SpacePercent = Percent / 100;
    let Liters = VolumeLiter * (1 - SpacePercent);
    console.log(Liters);
}
FishTank(["105", "77", "89", "18.5"]);
