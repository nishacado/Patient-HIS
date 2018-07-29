// import bigchaindb-orm
import Orm from 'bigchaindb-orm'
// connect to BigchainDB
const bdbOrm = new Orm(
    "https://test.bigchaindb.com/api/v1/",
    {
        app_id: "968ba82c",
        app_key: "ddd3ea7b7a13fa55752346e2e4b85fe3"
    }
)
// define(<model name>,<additional information>)
// <model name>: represents the name of model you want to store
// <additional inf.>: any information you want to pass about the model (can be string or object)
// note: cannot be changed once set!
bdbOrm.define("myModel", "https://schema.org/v1/myModel")
// create a public and private key for Alice
const aliceKeypair = new bdbOrm.driver.Ed25519Keypair()
// from the defined models in our bdbOrm we create an asset with Alice as owner
bdbOrm.models.myModel
    .create({
        keypair: aliceKeypair,
        data: { key: 'dataValue' }
    })
    .then(asset => {
        /*
            asset is an object with all our data and functions
            asset.id equals the id of the asset
            asset.data is data of the last (unspent) transaction
            asset.transactionHistory gives the full raw transaction history
            Note: Raw transaction history has different object structure then
            asset. You can find specific data change in metadata property.
        */
        console.log(asset.id)
    })
    // get all objects with retrieve()
// or get a specific object with retrieve(object.id)
bdbOrm.models.myModel
.retrieve()
.then(assets => {
    // assets is an array of myModel
    console.log(assets.map(asset => asset.id))
})
