import { useEffect, useState, useRef } from 'react';

const KakaomapComponent = ({
    setLocationKakao = () => {},
    setIsEditingLocation = () => {},
    productLocation,
    setSearchQuery = () => {},
    searchQuery,
}) => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [searchValue, setSearchValue] = useState(searchQuery);
    const markerRef = useRef([]);
    const mapRef = useRef(null);
    console.log(productLocation, '상품 위치 정보');

    useEffect(() => {
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({ latitude, longitude });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            '//dapi.kakao.com/v2/maps/sdk.js?appkey=e41d44d011aaf25abf4f6b47204a656b&libraries=services,clusterer&autoload=false';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
                    level: 5,
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                mapRef.current = map;
                const geocoder = new window.kakao.maps.services.Geocoder();

                window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                    const latlng = mouseEvent.latLng;

                    markerRef.current.forEach((marker) => marker.setMap(null));
                    markerRef.current = [];

                    const newMarker = new window.kakao.maps.Marker({
                        position: latlng,
                    });
                    newMarker.setMap(map);
                    markerRef.current.push(newMarker);

                    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const detailAddr = result[0].address.address_name;
                            setLocationKakao(detailAddr);
                            if (setIsEditingLocation) {
                                setIsEditingLocation(true);
                            }
                        } else {
                            console.log('주소 변환 실패');
                        }
                    });
                });

                const updateMarkers = (productLocation) => {
                    markerRef.current.forEach((marker) => marker.setMap(null));
                    markerRef.current = [];
                        console.log('array전');

                    if (productLocation) {
                        if ( productLocation.length > 0) {
                            console.log('array후');
                            productLocation.forEach((location) => {
                                if (location && location.latitude && location.longitude) {
                                    const coords = new window.kakao.maps.LatLng(location.latitude, location.longitude);

                                    const marker = new window.kakao.maps.Marker({
                                        position: coords,
                                    });

                                    marker.setMap(map);
                                    markerRef.current.push(marker);
                                }
                            });
                        }
                    }
                };

                updateMarkers(productLocation);

                const searchBox = document.getElementById('search-box');

                const handleKeyUp = (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.target.value;
                        if (value.trim()) {
                            setSearchQuery(value);
                            console.log(value);
                        }
                    }
                };

                searchBox.addEventListener('keyup', handleKeyUp);

                return () => {
                    searchBox.removeEventListener('keyup', handleKeyUp);
                };
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [location]);

    useEffect(() => {
        if (productLocation) {
            if (mapRef.current && productLocation.length > 0) {
                const coords = new window.kakao.maps.LatLng(productLocation[0].latitude, productLocation[0].longitude);
                mapRef.current.setCenter(coords);
                markerRef.current.forEach((marker) => marker.setMap(null));
                markerRef.current = [];
                productLocation.forEach((location) => {
                    const coords = new window.kakao.maps.LatLng(location.latitude, location.longitude);
                    const marker = new window.kakao.maps.Marker({
                        position: coords,
                    });
                    marker.setMap(mapRef.current);
                    markerRef.current.push(marker);
                });
            }
        }
    }, [productLocation]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <input
                id="search-box"
                type="text"
                placeholder="지역을 검색해주세요."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: '100%' }}
            />
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default KakaomapComponent;
