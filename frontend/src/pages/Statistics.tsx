import { useEffect, useState } from "react";
import "./Stats.scss";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Statistics = () => {
    const [femaleCount, setFemaleCount] = useState<number>(0);
    const [maleCount, setMaleCount] = useState<number>(0);
    const [otherCount, setOtherCount] = useState<number>(0);
    const [arius, setArius] = useState<number>(0);
    const [taurus, setTaurus] = useState<number>(0);
    const [gemini, setGemini] = useState<number>(0);
    const [cancer, setCancer] = useState<number>(0);
    const [leo, setLeo] = useState<number>(0);
    const [virgo, setVirgo] = useState<number>(0);
    const [libra, setLibra] = useState<number>(0);
    const [scorpio, setScorpio] = useState<number>(0);
    const [aquarius, setAquarius] = useState<number>(0);
    const [sagittarius, setSagittarius] = useState<number>(0);
    const [capricorn, setCapricorn] = useState<number>(0);
    const [pisces, setPisces] = useState<number>(0);
    const [custJanuary, setCustJanuary] = useState<number>(0);
    const [custFebruary, setCustFebruary] = useState<number>(0);
    const [custMarch, setCustMarch] = useState<Number>(0);
    const [custApril, setCustApril] = useState<Number>(0);
    const [custMay, setCustMay] = useState<Number>(0);
    const [custJune, setCustJune] = useState<Number>(0);
    const [custJuly, setCustJuly] = useState<Number>(0);
    const [custAugust, setCustAugust] = useState<Number>(0);
    const [custSeptember, setCustSeptember] = useState<Number>(0);
    const [custOctober, setCustOctober] = useState<Number>(0);
    const [custNovember, setCustNovember] = useState<Number>(0);
    const [custDecember, setCustDecember] = useState<Number>(0);
    const [valentines2018Percent, setValentines2018Percent] = useState<Number>(0);
    const [valentines2019Percent, setValentines2019Percent] = useState<Number>(0);
    const [valentines2020Percent, setValentines2020Percent] = useState<Number>(0);
    const [valentines2021Percent, setValentines2021Percent] = useState<Number>(0);
    const [valentines2022Percent, setValentines2022Percent] = useState<Number>(0);
    const [valentines2023Percent, setValentines2023Percent] = useState<Number>(0);
    const [valentines2018Money, setValentines2018Money] = useState<Number>(0);
    const [valentines2019Money, setValentines2019Money] = useState<Number>(0);
    const [valentines2020Money, setValentines2020Money] = useState<Number>(0);
    const [valentines2021Money, setValentines2021Money] = useState<Number>(0);
    const [valentines2022Money, setValentines2022Money] = useState<Number>(0);
    const [valentines2023Money, setValentines2023Money] = useState<Number>(0);
    const [valentines2018Flower, setValentines2018Flower] = useState<Number>(0);
    const [valentines2019Flower, setValentines2019Flower] = useState<Number>(0);
    const [valentines2020Flower, setValentines2020Flower] = useState<Number>(0);
    const [valentines2021Flower, setValentines2021Flower] = useState<Number>(0);
    const [valentines2022Flower, setValentines2022Flower] = useState<Number>(0);
    const [valentines2023Flower, setValentines2023Flower] = useState<Number>(0);
    const [eventCounters, setEventCounters] = useState(Array(12).fill(0));
    const [encounterCounters, setEncounterCounters] = useState(Array(12).fill(0));
    const [encounterRating, setEncounterRating] = useState(Array(5).fill(0));
    const apiUrlCust = "http://localhost:3001/customers";
    const apiUrlEvent = "http://localhost:3001/events";
    const apiUrlEncounters = "http://localhost:3001/encounters";
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(apiUrlCust, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const customersResponse = await response.json();

                const female = customersResponse.filter((customer: { gender: string }) => customer.gender === "Female").length;
                const male = customersResponse.filter((customer: { gender: string }) => customer.gender === "Male").length;
                const other = customersResponse.filter((customer: { gender: string }) => customer.gender !== "Female" && customer.gender !== "Male").length;
                const astro1 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Aries").length;
                const astro2 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Taurus").length;
                const astro3 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Gemini").length;
                const astro4 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Cancer").length;
                const astro5 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Leo").length;
                const astro6 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Virgo").length;
                const astro7 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Libra").length;
                const astro8 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Scorpio").length;
                const astro9 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Aquarius").length;
                const astro10 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Sagittarius").length;
                const astro11 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Capricorn").length;
                const astro12 = customersResponse.filter((customer: { astrological_sign: string }) => customer.astrological_sign === "Pisces").length;
                const birth1 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "01").length;
                const birth2 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "02").length;
                const birth3 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "03").length;
                const birth4 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "04").length;
                const birth5 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "05").length;
                const birth6 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "06").length;
                const birth7 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "07").length;
                const birth8 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "08").length;
                const birth9 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "09").length;
                const birth10 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "10").length;
                const birth11 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "11").length;
                const birth12 = customersResponse.filter((customer: { birthdate: string }) => customer.birthdate.split('-')[1] === "12").length;

                setFemaleCount(female);
                setMaleCount(male);
                setOtherCount(other);
                setArius(astro1);
                setTaurus(astro2);
                setGemini(astro3);
                setCancer(astro4);
                setLeo(astro5);
                setVirgo(astro6);
                setLibra(astro7);
                setScorpio(astro8);
                setAquarius(astro9);
                setSagittarius(astro10);
                setCapricorn(astro11);
                setPisces(astro12);
                setCustJanuary(birth1);
                setCustFebruary(birth2);
                setCustMarch(birth3);
                setCustApril(birth4);
                setCustMay(birth5);
                setCustJune(birth6);
                setCustJuly(birth7);
                setCustAugust(birth8);
                setCustSeptember(birth9);
                setCustOctober(birth10);
                setCustNovember(birth11);
                setCustDecember(birth12);
            } catch (error) {
                console.error("Error in API call", error);
            }
        };

        type ValentineData = {
            Year: number;
            PercentCelebrating: number;
            PerPerson: number;
            PercentBuyingFlowersForDate: number;
        };

        const fetchValentinesData = async () => {
            try {
                const response = await fetch("valentines-day-stats.json");
                const data: ValentineData[] = await response.json();

                data.forEach((entry: ValentineData) => {
                    switch (entry.Year) {
                        case 2018:
                            setValentines2018Percent(entry.PercentCelebrating);
                            setValentines2018Money(entry.PerPerson);
                            setValentines2018Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        case 2019:
                            setValentines2019Percent(entry.PercentCelebrating);
                            setValentines2019Money(entry.PerPerson);
                            setValentines2019Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        case 2020:
                            setValentines2020Percent(entry.PercentCelebrating);
                            setValentines2020Money(entry.PerPerson);
                            setValentines2020Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        case 2021:
                            setValentines2021Percent(entry.PercentCelebrating);
                            setValentines2021Money(entry.PerPerson);
                            setValentines2021Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        case 2022:
                            setValentines2022Percent(entry.PercentCelebrating);
                            setValentines2022Money(entry.PerPerson);
                            setValentines2022Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        case 2023:
                            setValentines2023Percent(entry.PercentCelebrating);
                            setValentines2023Money(entry.PerPerson);
                            setValentines2023Flower(entry.PercentBuyingFlowersForDate);
                            break;
                        default:
                            console.error("Unknown Year:", entry.Year);
                            break;
                    }
                });
            } catch (error) {
                console.error("Error in file import", error);
            }
        };
        const fetchEvents = async () => {
            try {
                const response = await fetch(apiUrlEvent, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const eventResponse = await response.json();
                setEventCounters((prevCounters) => {
                    const newCounters = [...prevCounters];
                    eventResponse.forEach((event: any) => {
                        const eventDate = new Date(event.date);
                        const year = eventDate.getFullYear();
                        if (year === 2024) {
                            const month = eventDate.getMonth();
                            newCounters[month] += 1;
                        }
                    });
                    return newCounters;
                });
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        const fetchEncounters = async () => {
            try {
                const response = await fetch(apiUrlEncounters, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const encounterResponse = await response.json();
                setEncounterCounters(() => {
                    const newCounters = Array(12).fill(0);
                    encounterResponse.forEach((encounter: any) => {
                        const encounterDate = new Date(encounter.date);
                        const year = encounterDate.getFullYear();
                        if (year === 2024) {
                            const month = encounterDate.getMonth();
                            newCounters[month] += 1;
                        }
                    });
                    return newCounters;
                });

                setEncounterRating(() => {
                    const newRatings = Array(5).fill(0);
                    encounterResponse.forEach((encounter: any) => {
                        const rating = encounter.rating;
                        if (rating >= 1 && rating <= 5) {
                            newRatings[rating - 1] += 1;
                        }
                    });
                    return newRatings;
                });
            } catch (error) {
                console.error('Error fetching encounters:', error);
            }
        };
        fetchCustomers();
        fetchValentinesData();
        fetchEvents();
        fetchEncounters();
    }, [apiUrlCust, apiUrlEvent, apiUrlEncounters, token]);

    const encounters = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Meetings organized per month",
            data: encounterCounters,
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
        }],
    };
    const event = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Events organized per month",
            data: eventCounters,
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
        }],
    };
    const birthday = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Customer birthday month",
            data: [custJanuary, custFebruary, custMarch, custApril, custMay, custJune, custJuly, custAugust, custSeptember, custOctober, custNovember, custDecember],
            backgroundColor: "rgba(75, 192, 192, 1)",
        },],
    };
    const celebrating = {
        labels: ["0", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "Percent of people celebrating Valentine's Day",
            data: [100, valentines2018Percent, valentines2019Percent, valentines2020Percent, valentines2021Percent, valentines2022Percent, valentines2023Percent],
            backgroundColor: "rgba(255, 105, 180, 1)",
        },],
    };
    const moneyUsed = {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "Money used on Valentine's Day in €",
            data: [valentines2018Money, valentines2019Money, valentines2020Money, valentines2021Money, valentines2022Money, valentines2023Money],
            backgroundColor: "rgba(144, 238, 144, 1)",
        },],
    };
    const flowersGiven = {
        labels: ["0", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "Percent of people giving flower",
            data: [100, valentines2018Flower, valentines2019Flower, valentines2020Flower, valentines2021Flower, valentines2022Flower, valentines2023Flower],
            backgroundColor: "rgba(255, 0, 0, 1)",
        },],
    };

    const astrologicData = {
        labels: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Aquarius", "Sagittarius", "Capricorn", "Pisces"],
        datasets: [
            {
                data: [arius, taurus, gemini, cancer, leo, virgo, libra, scorpio, aquarius, sagittarius, capricorn, pisces],
                backgroundColor: [
                    "rgba(255, 0, 0, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(0, 0, 255, 1)",
                    "rgba(255, 255, 0, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(255, 0, 255, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(128, 0, 128, 1)",
                    "rgba(255, 105, 180, 1)",
                    "rgba(165, 42, 42, 1)",
                    "rgba(128, 128, 128, 1)",
                    "rgba(0, 0, 0, 1)",
                ],
                borderColor: [
                    "rgba(255, 0, 0, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(0, 0, 255, 1)",
                    "rgba(255, 255, 0, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(255, 0, 255, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(128, 0, 128, 1)",
                    "rgba(255, 105, 180, 1)",
                    "rgba(165, 42, 42, 1)",
                    "rgba(128, 128, 128, 1)",
                    "rgba(0, 0, 0, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const genderData = {
        label: "Genders",
        labels: ["Women", "Men", "Others"],
        datasets: [
            {
                data: [femaleCount, maleCount, otherCount],
                backgroundColor: [
                    "rgba(255, 105, 180, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(128, 128, 128, 1)",
                ],
                borderColor: [
                    "rgba(255, 105, 180, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(128, 128, 128, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const ratingData = {
        label: "Ratings",
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
            {
                data: encounterRating,
                backgroundColor: [
                    "rgba(255, 0, 0, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(255, 255, 0, 1)",
                    "rgba(144, 238, 144, 1)",
                    "rgba(0, 100, 0, 1)"
                ],
                borderColor: [
                    "rgba(255, 0, 0, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(255, 255, 0, 1)",
                    "rgba(144, 238, 144, 1)",
                    "rgba(0, 100, 0, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0,
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function() {
                        return '';
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: false
                }
            },
            y: {
                display: true,
                title: {
                    display: false
                }
            }
        }
    };

    const optionsAstro = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, },
            title: {
                display: true, text: "Astrological charts",
                font: { size: 18, },
            },
        },
    };

    const optionsGender = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, },
            title: {
                display: true, text: "Gender charts",
                font: { size: 18, },
            },
        },
    };
    const optionsRating = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, },
            title: {
                display: true, text: "Rating charts",
                font: { size: 18, },
            },
        },
    };

    return (
        <>
            <div className="container">
                <div className="box-pie">
                    <div style={{ height: "250px", width: "250px" }}>
                        <Pie data={astrologicData} options={optionsAstro} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px", width: "250px" }}>
                        <Bar data={moneyUsed} options={options} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px" }}>
                        <Line data={encounters} options={options} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="box-pie">
                    <div style={{ height: "250px" }}>
                        <Line data={event} options={options} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px" }}>
                        <Bar data={birthday} options={options} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px", width: "250px" }}>
                        <Pie data={genderData} options={optionsGender} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="box-pie">
                    <div style={{ height: "250px", width: "250px" }}>
                        <Pie data={ratingData} options={optionsRating} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px" }}>
                        <Bar data={celebrating} options={options} />
                    </div>
                </div>
                <div className="box-pie">
                    <div style={{ height: "250px", width: "250px" }}>
                        <Bar data={flowersGiven} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Statistics;
