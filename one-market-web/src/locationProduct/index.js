import KakaomapComponent from '../kakaomap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const LocationProductComponent = () => {
    const [productLocation, setProductLocation] = useState([]);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const searchLocation = async (location) => {
        if (!location || typeof location !== 'string') return;

        console.log('Searching for location:', location);

        try {
            const response = await axios.post('http://localhost:3006/product/search', {
                productName: location.split(' ').slice(0, 2).join(' '),
            });

            console.log('Response data:', response.data);

            if (response.status === 200) {
                if (Array.isArray(response.data)) {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    const locations = await Promise.all(
                        response.data.map(
                            (item) =>
                                new Promise((resolve) => {
                                    geocoder.addressSearch(item.userLocation, (result, status) => {
                                        if (status === window.kakao.maps.services.Status.OK && result[0]) {
                                            const latitude = result[0].y;
                                            const longitude = result[0].x;
                                            resolve({
                                                latitude: parseFloat(latitude),
                                                longitude: parseFloat(longitude),
                                                address_name: item.userLocation,
                                            });
                                        } else {
                                            resolve(null);
                                        }
                                    });
                                })
                        )
                    );
                    console.log(locations, '받아온 데이터 위치 변환 경도 위도');
                    setProductLocation(locations);
                }
            } else {
                console.log('검색 실패, 상태 코드:', response.status);
            }
        } catch (error) {
            console.error('위치 상품 에러', error);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            searchLocation(searchQuery);
        }
    }, [searchQuery]);

    return (
        <div id="products-location">
            <h1 id="products-location-headline">거래지역</h1>
            <div className="products-location-map">
                <KakaomapComponent
                    setLocationKakao={setProductLocation}
                    setIsEditingLocation={setIsEditingLocation}
                    productLocation={productLocation}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    );
};

export default LocationProductComponent;
