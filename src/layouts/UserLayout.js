import React from 'react'

export default function UserLayout({ children }) {
    return (
        <div>
            {/**header ở đây */}
            <div className='cus-container'>
                {children}
            </div>
            {/**footer ở đây */}
        </div>
    )
}
