import React from 'react'
import Crouselcomponent from './Crouselcomponent'
import { Container, Card, Button } from 'react-bootstrap'
import { Bar, Line,Pie, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js';
import { Row,Col } from 'react-bootstrap';

function Home() {
    Chart.register(CategoryScale)
    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May', 'January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,0,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56]
            }
        ]
    }
    const stateline = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }
    const statepie = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
          }
        ]
      }
    const Signinhandle = () => {
        window.location.replace("/login")
    }
    return (
        <div style={{ padding: "20px", backgroundImage: "url('../Images/background1.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Crouselcomponent />
            <div style={{ backgroundColor: "grey", marginBottom: "50px", paddingLeft: "18px", paddingRight: "18px", marginTop: "8px", paddingBottom: "50px" }}>
                <h1 style={{ paddingLeft: "22px", paddingTop: "50px" }}>
                    Pizza Dilevery
                </h1>
                <h4 style={{ padding: "22px" }}>
                    Welocom to Pizza Delivery Service.This is the plan when you may choose the most delicious
                    pizza you like from wide variety of options!
                </h4>
                <hr style={{ margin: "22px" }} />
                <h4 style={{ padding: "22px" }}>
                    We're performing delivery free of charge in case if your order is higher tha 20$.
                </h4>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={Signinhandle} style={{ border: "2px solid black" }}>
                        Sign In and Order
                    </Button>
                </div>
                <Row>
                    <Col>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
                </Col><Col>
                <Line
                    data={stateline}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                /></Col><Col>
                 <Pie
          data={statepie}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </Col><Col>
        <Doughnut
          data={statepie}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /></Col>
        </Row>
            </div>

        </div>
    )
}

export default Home
