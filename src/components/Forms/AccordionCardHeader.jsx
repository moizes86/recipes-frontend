import React from 'react'

export default function AccordionCardHeader({id, target, text, controls}) {
    return (
      <div className="card-header" id={id} >
        <h2 className="mb-0">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={target}
            aria-controls={controls}
          >
              {text}
          </button>
        </h2>
      </div>
    );
}
