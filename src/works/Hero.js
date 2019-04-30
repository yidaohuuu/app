import React from 'react'

const Hero = ({ title, description }) => (
    <section className="hero is-dark">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    {title}
                </h1>
                <h2 className="subtitle">
                    {description}
                </h2>
            </div>
        </div>
    </section>
)

export default Hero