import React from 'react';

const GenericPage = ({ title }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 font-oswald mb-4">{title}</h1>
                <p className="text-gray-600 font-montserrat">This page is under construction.</p>
            </div>
        </div>
    );
};

export default GenericPage;
