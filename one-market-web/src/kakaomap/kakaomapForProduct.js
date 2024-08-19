import React, { useEffect, useState, useRef } from 'react';
import { message } from 'antd';

const KakaomapForProductLocation = ({ setLocationKakao, productLocation, setSearchQuery, searchQuery }) => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [searchValue, setSearchValue] = useState(searchQuery);
    const [flag, setFlag] = useState(false);
    const markerRef = useRef([]);
    const mapRef = useRef(null);

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

                const createInfoWindow = (content) => {
                    return new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${content}</div>`,
                        disableAutoPan: true,
                    });
                };

                const updateMarkers = (locations) => {
                    markerRef.current.forEach((marker) => marker.setMap(null));
                    markerRef.current = [];

                    if (locations && locations.length > 0) {
                        // Group locations by their lat/lng coordinates
                        const locationGroups = locations.reduce((acc, loc) => {
                            const key = `${loc.latitude},${loc.longitude}`;
                            if (!acc[key]) {
                                acc[key] = [];
                            }
                            acc[key].push(loc);
                            return acc;
                        }, {});

                        Object.keys(locationGroups).forEach((key) => {
                            const [lat, lng] = key.split(',').map(Number);
                            const coords = new window.kakao.maps.LatLng(lat, lng);
                            const markers = locationGroups[key];

                            const marker = new window.kakao.maps.Marker({
                                position: coords,
                            });

                            marker.setMap(map);
                            markerRef.current.push(marker);

                            const infoContent = `
                                <div style="padding:10px; width:200px;">
                                    ${markers
                                        .map(
                                            (loc) => `
                                        <div style="margin-bottom:5px;">
                                            <a href="/product/${loc.id}" style="color:#000; text-decoration:none;">
                                                <strong>상품명:</strong> ${loc.name || '정보 없음'}
                                            </a>
                                        </div>
                                    `
                                        )
                                        .join('')}
                                </div>
                            `;

                            const infoWindow = createInfoWindow(infoContent);
                            infoWindow.setPosition(coords);

                            window.kakao.maps.event.addListener(marker, 'click', () => {
                                infoWindow.open(map, marker);
                            });

                            const overlayContent = `
                                <div style="background:#000; padding:5px; border-radius:5px; color:#fff">
                                    총 ${markers.length}개의 상품
                                </div>
                            `;
                            const overlay = new window.kakao.maps.CustomOverlay({
                                position: coords,
                                content: overlayContent,
                                yAnchor: 0,
                            });

                            overlay.setMap(map);
                        });

                        const firstLocation = locations[0];
                        map.setCenter(new window.kakao.maps.LatLng(firstLocation.latitude, firstLocation.longitude));
                    } else {
                        message.error('해당 지역에 등록된 상품이 없습니다.');
                    }
                };

                if (flag) {
                    if (productLocation && productLocation.length > 0) {
                        updateMarkers(productLocation);
                    } else if (productLocation.length === 0) {
                        message.error('해당 지역에 등록된 상품이 없습니다.');
                    }
                }

                const searchBox = document.getElementById('search-box');

                const handleKeyUp = (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.target.value;
                        if (value.trim()) {
                            setSearchQuery(value);
                            setFlag(true);
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
    }, [location, productLocation, setSearchQuery, flag]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <input
                id="search-box"
                type="text"
                placeholder="지역을 검색해주세요."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '15px' }}
            />
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default KakaomapForProductLocation;
