import React,{useState, useEffect} from "react";
import '../styles/landing.css';
import NFTCard from "./nftcard";
import sellerPic from "../images/Ranked_Seller.png"
import TopSellers from "./TopSellers"
import "../styles/NFTCard.css"
import "../styles/exhibit.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSpring, animated } from "react-spring";
import classNames from 'classnames';
import Header from "./header"
import QlipNFTS from "./qlipNFTSection"
import bushland_NFT_img from "../images/BUSHLAND.png";
import ruin_of_osun_NFT_img from "../images/RUIN_OF_OSHUN.png"
import oshun_NFT_img from "../images/OSHUN_NFT.png"


const Landing = props => {

    const allTokensArray = props.allTokensArray;
    console.log(allTokensArray, 'all tokens in market')
    const [tokenObjects, setTokenObjects] = useState([]);
    const [displayPointer, setDisplayPointer] = useState('all');
    const [photography, setPhotoGraphy] = useState([]);
    const [meme, setMeme] = useState([]);
    const [art, setArt] = useState([]);
    const [noOfItems, setNoOfItems] = useState(6);
    const sliceItems = allTokensArray.slice(0, noOfItems);
    const [key, setKey] = useState(1);

    const loadMore = ()=> {
        setNoOfItems(noOfItems + noOfItems);
    }

    const scrolling = useSpring({
        from: { transform: "translate(60%,0)" },
        to: { transform: "translate(-60%,0)" },
        config: { duration: 10000 },
        reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
          setKey(key + 1);
        }
      });
    
    const sortTokens = async () =>{ 
        const tokenObj = []
        const photoObj=[]
        const memeObj = []
        const artObj = []

        allTokensArray.map(async token => {

          if(token.category === '1'){
              photoObj.push(token)
              
          }
          if(token.category === '2'){
              artObj.push(token)
              
          }
          if(token.category === '3'){
              memeObj.push(token)
         }

        tokenObj.push(token);
        setPhotoGraphy(photoObj);
        setMeme(memeObj);
        setArt(artObj);
          
        console.log(artObj, 'art category')
         // if(tokenObj.length === allTokensArray.length) 
          setTokenObjects(tokenObj)
        })
        console.log(tokenObjects, 'token objects')
    } 
      
  const allTokens = sliceItems.map((token)=> {   
    return (
        <NFTCard
            key = {token.id}
            uniqueId = {token.id}
            name = {token.name}
            imageSrc = {token.imgUrl}
            price = {token.price}
        />
    )
  })


  const artTokens = art.map((token)=> {
    return (
        <NFTCard
            key = {token.id}
            uniqueId = {token.id}
            name = {token.name}
            imageSrc = {token.imgUrl}
            price = {token.price}
        />
    )
  })

  const photographyTokens = photography.map((token)=> {
    return (
        <NFTCard
            key = {token.id}
            uniqueId = {token.id}
            name = {token.name}
            imageSrc = {token.imgUrl}
            price = {token.price}
        />
    )
  })
  const memeTokens = meme.map((token)=> {
    return (
        <NFTCard
            key = {token.id}
            uniqueId = {token.id}
            name = {token.name}
            imageSrc = {token.imgUrl}
            price = {token.price}
        />
    )
  })

  let currentDisplay;
  if(displayPointer === 'all'){
      currentDisplay = allTokens
  }
  if(displayPointer === 'art'){
      currentDisplay = artTokens
  }
  if(displayPointer === 'photography'){
    currentDisplay = photographyTokens
}
if(displayPointer === 'meme'){
    currentDisplay = memeTokens
}

const allBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay === allTokens
  })
  const artBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay === artTokens
  })

  const memeBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay === memeTokens
  })

  const photoBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay === photographyTokens
  })

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={3} height={400} width={300} />
                        </p>
                </SkeletonTheme>

      useEffect( async()=> {

        console.log("ccccccc: ", props.allTokensArray)
        await sortTokens();

      },[props.allTokensArray])


      // data of exclusice clip nft in the exclusice clip nft section of the landing page.
    //   if this data are to be gotten from the crontract as well, then this should be an empty array initially untill the data is back
      const ExclusiveClipNftsList = [
        {
            name: "RUIN OF OSUN",
            image: bushland_NFT_img,
            price: "0.1 BNB",
            rightText: "1/1",
            leftText: "SAPPHIRE",
            description: "Oshun is considered one of the most powerful of all orisha, her temple is filled with treasure and water rune magic."
        },
        {
            name: "BUSHLAND",
            image: ruin_of_osun_NFT_img,
            price: "0.03 BNB",
            rightText: "1/1",
            leftText: "EMERALD",
            description: "Explore Bushland - the shattered remains of the once beautiful african homeworld, San."
        },
        {
            name: "OSHUN",
            image: oshun_NFT_img,
            price: "0.03 BNB",
            rightText: "1/1",
            leftText: "RUBY",
            description: "The Yoruba river diety who rules divinity, feminity, fertility, beauty and love."
        }
    ]

    return(
        <div className="landing" id="landing">
            <Header/>
            <animated.div className="moving-text" style={scrolling}>
                We know you love NFTs, please note that <a href="app.qlipit.io">app.qlipit.io</a> is still in Beta and our contracts are yet to be audited, do trade with caution 😁🎨
                </animated.div>
            <QlipNFTS ExclusiveClipNftsList = {ExclusiveClipNftsList} />
           
            <main>
                <div className = "sections top-sellers">
                    <h1 className = "section-header">Top Sellers</h1>
                    <div className = "top-seller-container">
                        <TopSellers name = "Karla Gyan" profilePic = {sellerPic} number = "1" balance = "700" />
                        <TopSellers name = "Karla Gyan" profilePic = {sellerPic} number = "2" balance = "500" />
                        <TopSellers name = "Karla Gyan" profilePic = {sellerPic} number = "3" balance = "200" />
                        <TopSellers name = "Karla Gyan" profilePic = {sellerPic} number = "4" balance = "100" />
                        <TopSellers name = "Karla Gyan" profilePic = {sellerPic} number = "5" balance = "100" />
                    </div>
                </div>

                <div className = "sections market-place">
                    <h1 className = "section-header">Marketplace</h1>
                    <nav className = "marketplace-nav">
                        <ul>
                            <li><button className = {allBtn}
                            onClick={()=> {
                                setDisplayPointer('all')
                            }}>All items</button></li>

                            <li><button className = {artBtn}
                            onClick={()=> {
                                setDisplayPointer('art')
                            }}>Art</button></li>

                            <li><button className = {memeBtn}
                            onClick={()=> {
                                setDisplayPointer('meme')
                            }}>Meme</button></li>

                            <li><button className = {photoBtn}
                            onClick={()=> {
                                setDisplayPointer('photography')
                            }}>Photography</button></li>
                            <li><button className = "nav-link">Music</button></li>
                            <li><button className = "nav-link">Video</button></li>
                            <li><button className = "nav-link">3D</button></li>
                            <li><button className = "nav-link">Virtual Reality</button></li>
                            <li><button className = "nav-link">Domain Names</button></li>
                            <li className = "nav-link">filter by: {"Most Recent"}</li>
                        </ul>
                    </nav>
                    <div className = "nft-section-container">
                    

                        {!!allTokensArray.length ? currentDisplay : loader}
                       
                    </div>
                    { allTokensArray.length > sliceItems.length || sliceItems.length < allTokensArray.length ?
                    <div className = "load-more-btn-container">
                        <button className = "load-more"
                        onClick={()=> loadMore()}>Load More</button>
                    </div> : ''}
                    
                </div>
            </main>
        </div>
        
    )

}

export default Landing;