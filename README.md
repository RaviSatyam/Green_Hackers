# Transparent-Carbon-Friend 

This  Dapp provides scripts to run this application on your local system. You have to run front-end as well as back-end on your local system with different port.
## Getting Started

### Prerequisites

- Node.js
- React.js
- Hedera Hashgraph account
- Hedera Hashgraph Testnet account (for testing)
- Hashconnect

### Installation

- Clone this repository or download the code as a zip file.
`git clone https://github.com/RaviSatyam/Green_Hackers.git`
- Go to the `back-end` directory: `cd back-end`
- Install dependencies by running `npm install`.
- Create a `.env` file in the root directory of the project and add your Hedera Hashgraph account details.
- Run the scripts by executing `npm run start`.
- Go to the `my-app` directory: `cd front-end/my-app`
- Install dependencies by running `npm install`.
- Create a `.env` file in the root directory of the project and add your Hedera Hashgraph account details.
- Run the scripts by executing `npm run start`.

## Usage

To use this application, you'll need to have Node.js , React.js , hashconnect and the @hashgraph/sdk and dotenv modules installed. Once you have those dependencies installed, you can clone this repository and run the back-end application using `npm run start` and 
front-application using `npm run start`.
Once these applications start running at different ports you need to go to the web page and should need to follow these steps-

1. Hit the Connect wallet button and login with predefined govt hashpack account(0.0.3885341)-> No need to register
2. Hit the Connect wallet button and login with predefined MRV hashpack account(0.0.4376836)-> No need to register
3. Hit the Connect wallet button and register the new user
4. Govt approve the emitter request
5. User will become emitter and directed to respective emitter dashboard
6. MRV set the CC allowance for emitter, it has 2 options
     - By account Id
     - By region and Industry type
7. Emitter send the request for CC allowance to govt
8. Govt accept the CC allowance request
9. After specified time frame MRV set CC for Payback
10. Govt send this payback request to Emitter
11. Emitter accept Payback request and CC will transfer to Govt

## Primary market
1. Emitter hit the primary market tab
2. They can have two options-
    - wish to sell-> if choose this, will become seller
    - wish to buy-> if choose this, will become buyer
3. Seller can see all interested buyer list on their primary market dashboard
4. If seller aaprove the CC for interested buyer, atomic swap will occur and CC will transfer to buyer account and Hbar will deducted.


#### NOTE :
This decentralized application (Dapp) has been developed specifically for proof of concept (POC) purposes. We have thoroughly tested the entire user journey using their account IDs. Looking ahead, there is potential to expand the implementation of this application on a larger scale.


## Project Descriptions Link- 
`https://alapanx.notion.site/alapanx/TRANSPARENT-CARBON-MARKET-c5559eaf1559402999121d9d3f6a702d`

## Pitch Video Link- 
Refer the documentation to see the demonstration video link.

## Author

Green_Hackers