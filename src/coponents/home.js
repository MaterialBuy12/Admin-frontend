import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  Customercount,
  Orderget,
  Productcount,
  Vendorcount,
} from "../services/api";
import Footer from "./footer/Footer";
function Home() {
  const [cutomercount, setcutomercount] = useState("");
  const [vendorcount, setvendorcount] = useState("");
  const [productco, setproductco] = useState("");
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [lifeRevenue, setLifeRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    async function data() {
      let dat = await Orderget();
      let revenueamount = dat.data.data.orders;

      let yearRevenue = 0;

      for (const order of revenueamount) {
        if (order.status !== "REFUND") {
          const createdAt = new Date(order.createdAt);
          const currentYear = new Date().getFullYear();
          if (createdAt.getFullYear() === currentYear) {
            yearRevenue += order.amount;
          }
        }
      }
      setYearlyRevenue(yearRevenue);

      let monthRevenue = 0;

      for (const order of revenueamount) {
        if (order.status !== "REFUND") {
          const createdAt = new Date(order.createdAt);

          const currentYear = new Date().getMonth();

          if (createdAt.getMonth() === currentYear) {
            monthRevenue += order.amount;
          }
        }
      }
      setMonthlyRevenue(monthRevenue);

      let totalRevenue = 0;
      for (const order of revenueamount) {
        if (order.status !== "REFUND") {
          totalRevenue += order.amount;
        }
      }
      setLifeRevenue(totalRevenue);
    }
    data();
  }, []);
  useEffect(() => {
    async function data() {
      let dat = await Customercount();
      let data = await Vendorcount();
      let resp = await Productcount();

      setcutomercount(dat.data);
      setvendorcount(data.data);
      setproductco(resp);
    }
    data();
  }, []);
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Dashboard</h4>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item">
                      <Link to="/">materialbuy</Link>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-cube-outline bg-primary  text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Customer</h5>
                    </div>
                    <h3 className="mt-4">{cutomercount}</h3>

                    <p className="text-muted mt-2 mb-0">Life time </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-briefcase-check bg-success text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Vendors</h5>
                    </div>
                    <h3 className="mt-4">{vendorcount}</h3>
                    <p className="text-muted mt-2 mb-0">Life time </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-tag-text-outline bg-warning text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Products</h5>
                    </div>
                    <h3 className="mt-4">{productco}</h3>
                    <p className="text-muted mt-2 mb-0">Life time </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-buffer bg-danger text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Revenue</h5>
                    </div>
                    <h3 className="mt-4">Rs {monthlyRevenue}</h3>

                    <p className="text-muted  mt-2 mb-0">This month</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-buffer bg-info text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Revenue</h5>
                    </div>
                    <h3 className="mt-4">Rs {yearlyRevenue}</h3>

                    <p className="text-muted  mt-2 mb-0">This Year</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card">
                  <div className="card-heading p-4">
                    <div className="mini-stat-icon float-right">
                      <i className="mdi mdi-buffer bg-light text-white"></i>
                    </div>
                    <div>
                      <h5 className="font-16">Revenue</h5>
                    </div>
                    <h3 className="mt-4">Rs {lifeRevenue}</h3>
                    <p className="text-muted  mt-2 mb-0">Life time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
