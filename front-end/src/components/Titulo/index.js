export default function Titulo({title, text}) {
    return (
        <div className="container" style={{border: '1px solid #d3d3d3'}}>
            <div className="pricing-header px-3 py-3 pt-md-3 pb-md-3 mx-auto text-center">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{text}</p>
            </div>
        </div>
    )
}