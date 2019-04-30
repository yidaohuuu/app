import React from 'react'

const Card = ({ title, children, footer }) => (
    <div className="card">
        <header className="card-header">
            <p className="card-header-title">{title}</p>
        </header>
        <div className="card-content">
            <div className="content">
                {children}
            </div>
        </div>
        {
            footer
                ? (
                    <footer className="card-footer">
                        {footer}
                    </footer>
                )
                : null
        }
    </div>
)

export default Card