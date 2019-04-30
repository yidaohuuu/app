import React from 'react'

const FileInput = ({onChange}) => (
    <div className="file">
        <label className="file-label">
            <input type="file" onChange={onChange} className="file-input" />
            <span className="file-cta">
                <span className="file-icon">
                    <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                    Choose a file...
                </span>
            </span>
        </label>
    </div>
)

export default FileInput