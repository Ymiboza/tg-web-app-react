import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { img1, img2, img3, img4, img5, img6, img7, img8, img9 } from '../Image/Image'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

const products = [
    { id: '1', img: img1, title: 'Nike Metcon 7', price: 200, description: 'The Nike Metcon 7 boasts a design that’s built for weightlifting yet maintains enough flexibility for running, making it a great choice for all the moves you might encounter during your CrossFit WOD. Its all-rubber outsole wraps up the side of the shoe, making it well-suited for rope climbs. The heel is firm enough to give you plenty of balance when doing squats, box jumps and deadlifts. And its midsole cushion is enough to support running and other cardio-intensive exercises. However, people with wide feet should take note: Like all other Metcon iterations, many reviewers note that the Metcon 7 does tend to feel a little tight in the toebox.' },
    { id: '2', img: img2, title: 'Nike Air Zoom Pegasus', price: 180, description: 'The Nike Air Zoom Pegasus is designed to deliver the cushion and performance-enhancing features you need to glide your way to faster times. These are running shoes built for speed, period. The waffle lugs in the rubber outsole are there to provide a solid grip, which in turn helps with acceleration. The shoe’s foam layers are also reinforced in key points of impact to help smooth the transition in your stride. All of these features make it one of the top Nike running shoes for men on the market.' },
    { id: '3', img: img3, title: 'Nike Pegasus 3 Gore-Tex', price: 350, description: 'Good news for trail runners: Nike took the cushion and flexibility of its Pegasus road running shoe and incorporated them into its Nike Pegasus 3 GORE-TEX shoe for trail runners. The rubber lugs on its outsole are designed to grip a variety of rough terrain (ie.: pebble, dirt, wet grass, flat rock) on some pretty extreme surface gradients — from uphill to downhill and angles that plant your feet awkwardly inward or outward.' },
    { id: '4', img: img4, title: 'Nike LeBron 19', price: 400, description: 'Nike wants you to unleash your inner LeBron James with the LeBron 19 basketball shoe. Some basketball shoes slap a pro athlete’s name or logo on the tongue and call it a day. But customers reviewing the LeBron 19 say time and time again that it lives up to the hype and legacy of the player who inspired them. Nike ankle support shoes like the LeBron 19s are designed for a secure fit around the ankle to keep your foot stable during prolonged, rigorous movement on the court. And to achieve this snug-yet-responsive feel, Nike constructed the shoe’s inner sleeve so it’s attached to a sculpted overlay where the laces interlock, with the goal of cutting movement inside the shoe down to practically nothing.' },
    { id: '5', img: img5, title: 'Nike Air Huarache', price: 80, description: 'Running errands around town is practically a sport onto itself, and the Nike Huarache casual shoes will have you looking fashionable while supporting every step. Its supportive structure and smooth stride come from the fact that the shoe was originally designed for runners — but it steadily grew to be as recognized for its unique heel clip and dialed-down branding as much as its performance. Its upper blends soft leather with breathable fabric that work to conform to your foot while helping to prevent overheating. Inside, the cushioned sleeve stretches for a snug fit. The midsole is designed to add bounce, and its rubber sole provides traction.' },
    { id: '6', img: img6, title: 'Nike Go FlyEase', price: 100, description: 'The Go FlyEase is Nike’s first-ever hands-free shoe. It’s constructed with a rather impressive tension band and a bi-stable hinge that locks the shoe into an open position, held at an angle that makes it possible for you to slip your feet in. Once you step down and apply minimal pressure against the sole, the shoe clicks into a locked position. When you’re ready to kick the shoes off, you simply step on the heel of one shoe and lift your foot out. That’s when the shoe transitions seamlessly back into its open position, ready and waiting for your next outing. Their slip-on design makes them a great pick for people with physical limitations, or who just prefer not to worry about lacing up.' },
    { id: '7', img: img7, title: 'Nike Court Vision', price: 120, description: 'The Nike Court Vision low top basketball shoe brings the classic 80s basketball aesthetic back to life. Its upper is constructed from a perforated leather that takes the shape of your foot while allowing heat to vent. The outsole is flat with deep and intricate traction, and the insoles are designed to give you a soft feel with each step. Based on online reviews, the Nike Court Vision toebox should give you plenty of wiggle room without too much give — though customers note they can be a bit rigid with not much flexibility (they’re not designed for running by any stretch). So if you like fashionable throwback styles and not a too-snug feel around your toes, definitely look into the Nike Court Vision low top shoes.' },
    { id: '8', img: img8, title: 'Nike Blazer Mid', price: 100, description: 'What the Nike Court Vision aims to do for the lovers of classic 80s style, the Nike Blazer mid top shoe was designed to do the same for those who prefer the look of the 70s. An era when Nike itself was still the new kid on the block. From its collar and tongue to its midsole and outsole, the Nike Blazer embodies the classic basketball style, right down to the traction print you’ll leave after every step you take. But while its exterior is all vintage, Nike updated the insole to add modern-day comfort and support. That means you’ll have a fashionable throw-back style with improved durability and construction.' },
    { id: '9', img: img9, title: 'Nike Air Force 1', price: 110, description: 'The Nike Air Force 1 shoe is the company’s best seller of all time for a reason. It started as a breakout star on the basketball court that found its way to every corner of life. The Air Force 1 sets the standard for the classic high-top sneaker look, with its high collar, hook-and-loop closure and the perforated toebox that’s both fashionable and functional. We’ve already discussed in detail the attention Nike puts into the design of its shoes, so you can imagine the level of care it put into the shoe that helped land it on the map in the early 80s (1982, to be exact).' },
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([])
    const { tg, queryId } = useTelegram()

    const oneSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        fetch('https://9069-178-121-35-149.eu.ngrok.io/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', oneSendData)
        return () => {
            tg.offEvent('mainButtonClicked', oneSendData)
        }
    }, [oneSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className='list'>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    )
}

export default ProductList