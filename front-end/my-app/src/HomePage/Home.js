import logo from "../asset/image/logo.svg";
import hero from "../asset/image/hero.png";
import PairHashPack from "../hashconnect/PairHashPack";
import feature1 from "../asset/image/feature-1.png";
import feature2 from "../asset/image/feature-2.png";
import { Link as ScrollLink } from "react-scroll";
import { HashConnect } from "hashconnect";


import "../HomePage/Home.css";
import React, { useEffect } from "react";
import { useState } from "react";

function Home() {
  let hashconnect = new HashConnect();

let appMetadata = {
name: "dApp Example",
description: "An example hedera app",
icon: "https://absolute.url/to/icon.png",
};
    const [showComponent, setShowComponent] = React.useState(false);

    // useEffect(()=>{
     
      
    //   localStorage.clear();
    // })

    useEffect(() => {
      const PairHashPack = async () => {
        let initData = await hashconnect.init(appMetadata, "testnet", true);
        console.warn('initdata',initData);

        // rest of the code...
      };
    
      PairHashPack();
    },[]);
  
    const HashWallet = () => {
    
        setShowComponent(true);
      
    };

    const [activeLink, setActiveLink] = useState('home');

    const handleClick = (name) => {
      setActiveLink(name);
    }
  return (
    <>
      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 ">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" className="flex items-center">
              <img src={logo} className="h-6 mr-3 sm:h-9" alt=" Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-cyan-400">
                Transparent Carbon Market
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a 
                 onClick={HashWallet}
                className="text-white bg-button cursor-pointer hover:bg-buttonfocus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 bg-button hover:bg-button focus:outline-none focus:ring-purple-800"
              >
                Connect to Wallet
              </a>
              {showComponent && <PairHashPack />}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                <ScrollLink 
          to="home"
          onClick={() => handleClick('home')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'home' ? 'text-purple-700' : 'text-black cursor-pointer'}`}
          smooth={true} 
          spy={true}
          duration={500}
        >
          Home
        </ScrollLink>
                </li>
                <li>
                <ScrollLink 
          to="about"
          onClick={() => handleClick('about')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'about' ? 'text-purple-700' : 'text-black cursoir-pointer'}`}
          smooth={true} 
          spy={true}
          duration={500}
        >
          About
        </ScrollLink>
                </li>
                <li>
                <ScrollLink 
          to="market"
          onClick={() => handleClick('market')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'market' ? 'text-purple-700' : 'text-black cursoir-pointer'}`}
          smooth={true} 
          duration={500}
        >
          MarketPlace
        </ScrollLink>
                </li>
                <li>
                <ScrollLink 
          to="feature"
          onClick={() => handleClick('feature')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'feature' ? 'text-purple-700' : 'text-black cursoir-pointer'}`}
          smooth={true} 
          duration={500}
        >
          Features
        </ScrollLink>
                </li>
                <li>
                <ScrollLink 
          to="role"
          onClick={() => handleClick('role')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'role' ? 'text-purple-700' : 'text-black cursoir-pointer'}`}
          smooth={true} 
          duration={500}
        >
          Role
        </ScrollLink>
                </li>
                <li>
                <ScrollLink 
          to="testimonial"
          onClick={() => handleClick('testimonial')}
          className={`block cursor-pointer py-2 pl-3 pr-4  lg:hover:bg-transparent lg:border-0 lg:p-0 text-black  lg:hover:bg-transparent  ${activeLink === 'testimonial' ? 'text-purple-700' : 'text-black cursoir-pointer'}`}
          smooth={true} 
          duration={500}
        >
          Testimonial
        </ScrollLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="bg-background-color ">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white">
              Transparent Carbon Market
            </h1>
            <p className="max-w-2xl mb-6 font-light text-slate-200 lg:mb-8 md:text-lg lg:text-xl text-slate-100">
              Monitor and take action on your carbon footprint with our Hedera
              Hashgraph-Powered platform
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <ScrollLink 
          to="about"
          className="inline-flex cursor-pointer items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-button  rounded-full sm:w-auto focus:outline-none  focus:z-10"
          smooth={true} 
          spy={true}
          duration={500}
        >
          Explore More
        </ScrollLink>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={hero} alt="hero image" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------About-------------------------------------------------------------------------- */}

      <section id="about" className="bg-card1">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-black">
                About
              </h2>
              <p className="mb-8 font-light text-slate-400 lg:text-xl">
                At TCM, we are dedicated to helping organizations to
                make a positive impact on the environment by tracking and
                reducing their carbon footprint.
              </p>

              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-line my-7 "
              >
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Secure and Decentralized public ledger technology
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Efficient and transparent solution for carbon footprint
                    tracking.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Address climate change and achieve sustainability goals
                  </span>
                </li>
              </ul>
              <p className="mb-8 font-light lg:text-xl text-slate-400">
                We believe that by making carbon footprint tracking accessible
                and user-friendly, we can inspire collective action towards a
                greener future.
              </p>
            </div>
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src={feature1}
              alt="dashboard feature image"
            />
          </div>

          <section id="market">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src={feature2}
              alt="feature image 2"
            />
            <div className="text-gray-500 sm:text-lg text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-black">
                Transparent Carbon Market
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                We believe that by empowering individuals and organizations with
                actionable insights and tools, we can collectively make a
                significant on mitigating climate change and creating a more
                sustainable future.
              </p>
              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-line my-7 "
              >
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Ensures Traceability, Efficiency, and Trust
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Templates for both Buyer & Seller
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Buyers can easily buy token.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Sellers can easily sell token hassle-free
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-black">
                    Enhanced Security Measures
                  </span>
                </li>
              </ul>
            </div>
          </div>
          </section>
        </div>
      </section>

      {/* -----------------------------------------------------------Features----------------------------------------------------------------- */}

      <section id="feature" className="bg-white ">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-background-color">
              Trusted Worldwide
            </p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-black md:text-3xl ">
              Benefits that we are gaining from it
            </h2>
            <p className="font-light text-gray-500 sm:text-xl text-gray-400">
              There are lot of benefits of using hashgraph for controlling
              carbon emission, some of the key points been mentioned already.
            </p>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg
                className="w-10 h-10 mb-2 text-icon md:w-12 md:h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold text-black">
                Investment Opportunities​
              </h3>
            </div>
            <div>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 30V39C0 43.9707 10.7452 48 24 48C37.2549 48 48 43.9707 48 39V30C48 34.9707 37.2549 39 24 39C10.7452 39 0 34.9707 0 30Z"
                  fill="#87CAD9"
                />
                <path
                  d="M0 15V24C0 28.9707 10.7452 33 24 33C37.2549 33 48 28.9707 48 24V15C48 19.9706 37.2549 24 24 24C10.7452 24 0 19.9706 0 15Z"
                  fill="#87CAD9"
                />
                <path
                  d="M48 9C48 13.9705 37.2549 18 24 18C10.7452 18 0 13.9705 0 9C0 4.02945 10.7452 0 24 0C37.2549 0 48 4.02945 48 9Z"
                  fill="#87CAD9"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold text-black">
                Enhanced Market Liquidity​
              </h3>
            </div>
            <div>
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 52L36 36M41.3333 22.6667C41.3333 32.976 32.976 41.3333 22.6667 41.3333C12.3574 41.3333 4 32.976 4 22.6667C4 12.3574 12.3574 4 22.6667 4C32.976 4 41.3333 12.3574 41.3333 22.6667Z"
                  stroke="#87CAD9"
                  strokeWidth="6.99217"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3 className="mb-2 text-2xl font-bold text-black">
                Ease of Regulation​
              </h3>
            </div>
            <div>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 9.60002C28.3431 9.60002 27 7.45096 27 4.80001C27 2.14906 28.3431 0 30 0H45C46.6569 0 48 2.14906 48 4.80001V28.8001C48 31.4511 46.6569 33.6001 45 33.6001C43.3431 33.6001 42 31.4511 42 28.8001V16.3883L29.1213 36.9942C27.9498 38.8686 26.0502 38.8686 24.8787 36.9942L18 25.9882L5.12133 46.5942C3.94974 48.4686 2.05026 48.4686 0.87867 46.5942C-0.29289 44.7198 -0.29289 41.6804 0.87867 39.806L15.8787 15.8059C17.0503 13.9314 18.9497 13.9314 20.1213 15.8059L27 26.8119L37.7574 9.60002H30Z"
                  fill="#87CAD9"
                />
              </svg>

              <h3 className="mb-2 text-2xl font-bold text-black">
                Improved Market Access​
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/*------------------------------------------------------- Role---------------------------------------------------------------------------------- */}

      <section id="role" className="bg-card1 ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-black">
              Role
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl text-gray-400">
              Here four major actors are playing crucial role in Transparent
              Carbon Market
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-black bg-white border border-line rounded-lg shadow border-gray-600 xl:p-8 bg-gray-800 ">
              <h3 className="mb-4 text-2xl font-semibold">Government</h3>
              <p className="font-light text-gray-500 sm:text-lg text-gray-400">
                Great for personal use and for your side projects.
              </p>

              <ul role="list" className="mb-8 mt-6 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Evaluation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Certification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Registration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Verification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Monitoring and Reporting</span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white  focus:ring-purple-900"
              >
                Get started
              </a>
            </div>

            <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-line rounded-lg shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
              <h3 className="mb-4 text-2xl font-semibold text-black">MRV</h3>
              <p className="font-light text-gray-500 sm:text-lg text-gray-400">
                Best for large scale uses and extended redistribution rights.
              </p>

              <ul role="list" className="mb-8 mt-6 space-y-4 text-left">
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Monitoring</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Reporting</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Verification</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Compliance and Trading</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Carbon Market Integrity</span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white  focus:ring-purple-900"
              >
                Get started
              </a>
            </div>

            <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-line rounded-lg shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
              <h3 className="mb-4 text-2xl font-semibold text-black">
                Emitter
              </h3>
              <p className="font-light text-gray-500 sm:text-lg text-gray-400">
                Best for large scale uses and extended redistribution rights.
              </p>

              <ul role="list" className="mb-8 space-y-4 mt-6 text-left">
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Emissions Measurement</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Reduction Strategies</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Compliance</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Reporting</span>
                </li>
                <li className="flex items-center text-black space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Access to Buy & Sell</span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white  focus:ring-purple-900"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------Testimonial---------------------------------------------------------------------------- */}

      <section id="testimonial" className="bg-white">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl text-black">
                "I am truly excited about the impact this project can make in
                driving positive change and addressing one of the most pressing
                challenges of our time. The team's dedication, innovation, and
                commitment to making a difference are evident in every aspect of
                their work. I wholeheartedly support their mission and encourage
                others to join in this transformative journey towards
                sustainability."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 text-black">
                  Sumit Kumar
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 text-gray-400">
                  Green Hackers
                  
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ------------------------------------------------------FAQ----------------------------------------------------------------------- */}

      {/* <section className="bg-white ">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl text-black">
            Frequently asked questions
          </h2>
          <div className="max-w-screen-md mx-auto">
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white  text-gray-900 text-white"
              data-inactive-classes="text-gray-500 text-gray-400"
            >
              <h3 id="accordion-flush-heading-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 border-gray-700  text-white"
                  data-accordion-target="#accordion-flush-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-flush-body-1"
                >
                  <span>Can I use Landwind in open-source projects?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 rotate-180 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-1"
                className=""
                aria-labelledby="accordion-flush-heading-1"
              >
                <div className="py-5 border-b border-gray-200 border-gray-700">
                  <p className="mb-2 text-gray-500 text-gray-400">
                    Landwind is an open-source library of interactive components
                    built on top of Tailwind CSS including buttons, dropdowns,
                    modals, navbars, and more.
                  </p>
                  <p className="text-gray-500 text-gray-400">
                    Check out this guide to learn how to{" "}
                    <a
                      href="#"
                      className="text-purple-600 text-purple-500 hover:underline"
                    >
                      get started
                    </a>{" "}
                    and start developing websites even faster with components on
                    top of Tailwind CSS.
                  </p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 border-gray-700 text-gray-400"
                  data-accordion-target="#accordion-flush-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-2"
                >
                  <span>Is there a Figma file available?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-2"
                className="hidden"
                aria-labelledby="accordion-flush-heading-2"
              >
                <div className="py-5 border-b border-gray-200 border-gray-700">
                  <p className="mb-2 text-gray-500 text-gray-400">
                    Landwind is first conceptualized and designed using the
                    Figma software so everything you see in the library has a
                    design equivalent in our Figma file.
                  </p>
                  <p className="text-gray-500 text-gray-400">
                    Check out the{" "}
                    <a
                      href="#"
                      className="text-purple-600 text-purple-500 hover:underline"
                    >
                      Figma design system
                    </a>{" "}
                    based on the utility classes from Tailwind CSS and
                    components from Landwind.
                  </p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-3">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 border-gray-700 text-gray-400"
                  data-accordion-target="#accordion-flush-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-3"
                >
                  <span>
                    What are the differences between Landwind and Tailwind UI?
                  </span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-3"
                className="hidden"
                aria-labelledby="accordion-flush-heading-3"
              >
                <div className="py-5 border-b border-gray-200 border-gray-700">
                  <p className="mb-2 text-gray-500 text-gray-400">
                    The main difference is that the core components from
                    Landwind are open source under the MIT license, whereas
                    Tailwind UI is a paid product. Another difference is that
                    Landwind relies on smaller and standalone components,
                    whereas Tailwind UI offers sections of pages.
                  </p>
                  <p className="mb-2 text-gray-500 text-gray-400">
                    However, we actually recommend using both Landwind, Landwind
                    Pro, and even Tailwind UI as there is no technical reason
                    stopping you from using the best of two worlds.
                  </p>
                  <p className="mb-2 text-gray-500 text-gray-400">
                    Learn more about these technologies:
                  </p>
                  <ul className="pl-5 text-gray-500 list-disc text-gray-400">
                    <li>
                      <a
                        href="#"
                        className="text-purple-600 text-purple-500 hover:underline"
                      >
                        Landwind Pro
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-purple-600 text-purple-500 hover:underline"
                      >
                        Tailwind UI
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h3 id="accordion-flush-heading-4">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 border-gray-700 text-gray-400"
                  data-accordion-target="#accordion-flush-body-4"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-4"
                >
                  <span>What about browser support?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-4"
                className="hidden"
                aria-labelledby="accordion-flush-heading-4"
              >
                <div className="py-5 border-b border-gray-200 border-gray-700">
                  <p className="mb-2 text-gray-500 text-gray-400">
                    The main difference is that the core components from
                    Landwind are open source under the MIT license, whereas
                    Tailwind UI is a paid product. Another difference is that
                    Landwind relies on smaller and standalone components,
                    whereas Tailwind UI offers sections of pages.
                  </p>
                  <p className="mb-2 text-gray-500 text-gray-400">
                    However, we actually recommend using both Landwind, Landwind
                    Pro, and even Tailwind UI as there is no technical reason
                    stopping you from using the best of two worlds.
                  </p>
                  <p className="mb-2 text-gray-500 text-gray-400">
                    Learn more about these technologies:
                  </p>
                  <ul className="pl-5 text-gray-500 list-disc text-gray-400">
                    <li>
                      <a
                        href="#"
                        className="text-purple-600 text-purple-500 hover:underline"
                      >
                        Landwind Pro
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-purple-600 text-purple-500 hover:underline"
                      >
                        Tailwind UI
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* --------------------------------------------------------------footer------------------------------------------------------------------ */}

      <footer className="bg-white bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
          <div className="my-6 border-gray-200 sm:mx-auto border-gray-700 lg:my-8" />
          <div className="text-center">
            <a
              href="#"
              className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 text-white"
            >
              <img
                src={logo}
                className="h-6 mr-3 sm:h-9 text-black"
                alt="Landwind Logo"
              />
              <h2 className="text-black">Transparent Carbon Market</h2>
            </a>

            <span className="block text-sm text-center text-gray-500 text-gray-400">
              © 2023. Transparent Carbon Market All rights reserved.
            </span>
            <ul className="flex justify-center mt-5 space-x-5">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900  text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900  text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900  text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900  text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900  text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
