
import React, { useRef, useLayoutEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import '../../assets/css/seller/component/Dashboard.css';

const Dashboard = () => {
  const myChart = useRef(null);

  useLayoutEffect(() => {
    if (myChart.current) {
      const ctx = myChart.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['oct1', 'oct2', 'oct3', 'oct4', 'oct5', 'oct6','oct7','oct8','oct9','oct10','oct11'],
          datasets: [{
            label: 'SALES',
            data: [0],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Cleanup the chart instance on component unmount
      return () => {
        chartInstance.destroy();
      };
    }
  }, []); // Empty dependency array ensures useLayoutEffect runs once after the initial render
  const [topProducts,setTopProducts] = useState([1,1,1,1,1])
  return (
    <section className='seller_dashboard'>
      <div className="dashboard_header">
            <div className="dashboard_product header_box">
                <div className='hb_text'>
                  <span>PRODUCTS</span>
                <span>200</span>
                </div>
                <i className="fa-solid fa-box-open"></i>
            </div>
            <div className="dashboard_follower header_box">
                <div className='hb_text'>
                  <span>LIKES</span>
                <span>200</span>
                </div>
                <i className="fa-solid fa-thumbs-up"></i>
            </div>
            <div className="dashboard_likes header_box">
                <div className='hb_text'>
                  <span>FOLLOWERS</span>
                <span>200</span>
                </div>
                <i className="fa-solid fa-users"></i>
            </div>
        </div>
      <div className="graph">
        <canvas ref={myChart}></canvas>
      </div>
      {/* Other JSX code */}

      <div className="seller_top_products">
        <h4>TOP PRODUCTS</h4>

        <div className="tp_container">
          {topProducts && topProducts.map((key,index) => (

            <div className='p_list' key={index}>

            </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;