const { useState, useEffect } = require("react");

const gql = String.raw;
const deets = `
    _id
    name
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  `;

export default function useLatestData() {
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();
  // Slicemaster
  const [slicemasters, setSlicemaster] = useState();
  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(function() {
    // When the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `
      })
    }).then(res => res.json()).then(res => {
      setHotSlices(res.data.StoreSettings.hotSlices);
      setSlicemaster(res.data.StoreSettings.slicemaster);
    })
    .catch(err => {
      console.log("Error", err);
    })
  }, []);

  return {
    hotSlices,
    slicemasters
  }
}