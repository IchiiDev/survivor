import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const Home = () => {
    const [averageRating, setAverageRating] = useState<number>(0);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [totalEvents, setTotalEvents] = useState<number>(0);
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
    const [eventCounters, setEventCounters] = useState(Array(12).fill(0));
    const [encounterCounters, setEncounterCounters] = useState(Array(12).fill(0));
    const [encounterRating, setEncounterRating] = useState(Array(5).fill(0));
    const apiUrlCust = "http://localhost:3001/customers";
    const apiUrlCoaches = "http://localhost:3001/employees";
    const apiUrlEvent = "http://localhost:3001/events";
    const apiUrlEncounters = "http://localhost:3001/encounters";
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

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
                    navigate("/login");
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const customersResponse = await response.json();
                const totalCustomers = customersResponse.length;
                setTotalCustomers(totalCustomers);

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

        const fetchEvents = async () => {
            try {
                const response = await fetch(apiUrlEvent, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const eventResponse = await response.json();
                const totalEvents = eventResponse.length;
                setTotalEvents(totalEvents);
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
                console.error("Error in API call", error);
            }
        }
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

                setAverageRating(() => {
                    let result: number = 0;
                    let counter: number = 0;
                    encounterResponse.forEach((encounter: any) => {
                        result += encounter.rating;
                        counter++;
                    });
                    return result / counter;
                })
            } catch (error) {
                console.error('Error fetching encounters:', error);
            }
        };

        fetchCustomers();
        fetchEvents();
        fetchEncounters();
    }, [apiUrlCust, apiUrlCoaches, apiUrlEvent, apiUrlEncounters, navigate, token]);

    const birthday = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            data: [custJanuary, custFebruary, custMarch, custApril, custMay, custJune, custJuly, custAugust, custSeptember, custOctober, custNovember, custDecember],
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderColor: 'rgba(0, 0, 255, 1)',
            fill: true,
            tension: 0.1,
        },],
    };
    const events = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            data: eventCounters,
            backgroundColor: "rgba(75, 192, 192, 1)",
        }],
    };
    const encounters = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Meetings organized per month",
            data: encounterCounters,
            backgroundColor: "rgba(75, 192, 192, 1)",
        }],
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
            <div className="dashboard-container">
                <div className="dashboard-text">
                    <div className="dashboard-custom-text">Dashboard</div>
                    <div>Welcome!</div>
                </div>
                <div className="home-buttons">
                    <button className="button is-white time-button">Last 30 days</button>
                    <button className="button is-link reports-button">Reports</button>
                </div>
            </div>
            <div className="stats-container container is-fluid">
                <div className="box-customers">
                    <div className="box-header">
                        <div className="box-header-text">
                            <h1>Customers Overview</h1>
                            <h2>Customers birthday per months</h2>
                        </div>
                    </div>
                    <div className="box-overview">
                        <div className="box-overview-element">
                            <div className="box-overview-element-title">Customers</div>
                            <div className="box-overview-element-value">{totalCustomers}</div>
                        </div>
                        <div className="box-overview-element">
                        </div>
                    </div>
                    <div className="box-stats">
                        <Line data={birthday} options={options} />
                    </div>
                </div>
                <div className="box-events">
                    <div className="box-header">
                        <div className="box-header-text">
                            <h1>Events</h1>
                            <h2>Our events per months</h2>
                        </div>
                    </div>
                    <div className="box-overview">
                        <div className="box-overview-element">
                            <div className="box-overview-element-title">Events total</div>
                            <div className="box-overview-element-value">{totalEvents}</div>
                        </div>
                    </div>
                    <div className="box-stats">
                        <Bar data={events} options={options} />
                    </div>
                </div>
            </div>
            <div className="stats-container container is-fluid">
                <div className="box-meetings">
                    <div className="box-header">
                        <div className="box-header-text">
                            <h1>Meetings Overview</h1>
                            <h2>Meetings per months</h2>
                        </div>
                    </div>
                    <div className="box-overview">
                    </div>
                    <div className="box-stats" style={{ height: "250px" }}>
                        <Bar data={encounters} options={options} />
                    </div>
                </div>
                <div className="box-rating">
                    <div className="box-header">
                        <div className="box-header-text">
                            <h1>Rating Overview</h1>
                            <h2>Rating given</h2>
                        </div>
                    </div>
                    <div className="rating-average container">
                        <div className="rating-average-data">
                            <div className="rating-average-data-title">Rating average</div>
                            <div className="rating-average-data-value">{averageRating}</div>
                        </div>
                        <div className="rating-pie">
                            <Pie data={ratingData} options={optionsRating} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;
