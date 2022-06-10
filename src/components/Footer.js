import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div>
      <footer>
          <p> Author: Carlos Uzcategui</p>
          <p> Copyright &copy; 2022</p>
          <Link to="/about">About</Link>
      </footer>
    </div>
  )
}

export default Footer