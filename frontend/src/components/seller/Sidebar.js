import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";



const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
        <h1 className="adminSideBarHeading">E-Bazaar</h1>
      </Link>
      <Link to="/seller/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/seller/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/seller/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/seller/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/seller/support">
        <p>
          <PeopleIcon />
          Chat Support
        </p>
      </Link>
      
    </div>
  );
};

export default Sidebar;
