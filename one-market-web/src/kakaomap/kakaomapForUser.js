import React, { useEffect, useState, useRef } from 'react';

const KakaomapForUserInfo = ({ setLocationKakao, locationKakao, setIsEditingLocation }) => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const markerRef = useRef([]);
    const mapRef = useRef(null);
    const geocoderRef = useRef(null);

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
                geocoderRef.current = geocoder;

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
                            setIsEditingLocation(true);
                        } else {
                            console.log('주소 변환 실패');
                        }
                    });
                });

                const searchBox = document.getElementById('search-box');
                searchBox.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const query = searchBox.value;
                        if (query) {
                            geocoder.addressSearch(query, (result, status) => {
                                if (status === window.kakao.maps.services.Status.OK) {
                                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                                    map.setCenter(coords);

                                    markerRef.current.forEach((marker) => marker.setMap(null));
                                    markerRef.current = [];

                                    const newMarker = new window.kakao.maps.Marker({
                                        position: coords,
                                    });
                                    newMarker.setMap(map);
                                    markerRef.current.push(newMarker);

                                    setLocationKakao(result[0].address_name);
                                    setIsEditingLocation(true);
                                } else {
                                    console.log('주소 검색 실패');
                                }
                            });
                        }
                    }
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [location, setLocationKakao, setIsEditingLocation]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <input
                id="search-box"
                type="text"
                placeholder="주소를 입력해주세요."
                style={{ width: '100%', padding: '5px' }}
            />
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default KakaomapForUserInfo;
