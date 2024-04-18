import React, { useState, useEffect } from 'react';

const images = [
    'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
    'https://t4.ftcdn.net/jpg/03/92/21/09/360_F_392210928_JgmPZsGuKSye5FqOoCyjSGRTF7fJIgOS.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
    "https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg"
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div>
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <div style={{ display: 'flex', width: `${(images.length + 2) * 30}%`, transform: `translateX(-${(currentIndex + 1) * (100 / (images.length + 2))}%)`, transition: 'transform 0.5s ease' }}>
                    <img key={-1} src={images[images.length - 1]} alt="Image -1" style={{ flex: '1', maxWidth: '20%', margin: '0 10px', objectFit: 'cover' }} />
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} style={{ flex: '1', maxWidth: '20%', margin: '0 10px', objectFit: 'cover' }} />
                    ))}
                    <img key={images.length} src={images[0]} alt="Image end" style={{ flex: '1', maxWidth: '20%', margin: '0 10px', objectFit: 'cover' }} />
                </div>
            </div>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', marginTop: '20px' }}>
                {images.map((_, index) => (
                    <button key={index} onClick={() => handleDotClick(index)} style={{ width: '10px', height: '10px', borderRadius: '50%', margin: '0 5px', backgroundColor: currentIndex === index ? '#0087A0' : '#00AAC3', border: 'none', cursor: 'pointer' }}></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
