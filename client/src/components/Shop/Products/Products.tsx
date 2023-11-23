import "./Products.css";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import axiosInstance from "../../../axios";

import { FC } from "react";
import { Select, Space } from "antd";
import { Element } from "react-scroll";
import { useTranslation } from "react-i18next";
import ProductItem from "./ProductItem";
import matchshirt from "../../../assets/product-example.png";
import baby from "../../../assets/baby.png";
import backpack from "../../../assets/backpack.png";
import ball from "../../../assets/ball.png";
import cap from "../../../assets/cap.png";
import longshirt from "../../../assets/longshirt.png";
import shorts from "../../../assets/shorts.png";
import tshirt from "../../../assets/tshirt.png";
import { Product } from "../../../models";
import blackCart from "../../../assets/shopping-cart-black.png";
import { useCart } from "../../Context";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}

const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productFiltered, setProductFiltered] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;
  const context = useCart();

  const handleChange = (value: string) => {
    let sortedProducts: Product[] = [...products];
    let filteredSortedProducts: Product[] = [...productFiltered];

    if (productFiltered.length === 0) {
      switch (value) {
        case "least-stars":
          sortedProducts.sort((a, b) => a.rating - b.rating);
          setProducts(sortedProducts);
          break;
        case "most-stars":
          sortedProducts.sort((a, b) => b.rating - a.rating);
          setProducts(sortedProducts);
          break;
        case "most-price":
          sortedProducts.sort((a, b) => b.price - a.price);
          setProducts(sortedProducts);
          break;
        case "least-price":
          sortedProducts.sort((a, b) => a.price - b.price);
          setProducts(sortedProducts);
          break;
        default:
          console.log(value);
          break;
      }
    } else {
      switch (value) {
        case "least-stars":
          filteredSortedProducts.sort((a, b) => a.rating - b.rating);
          setProductFiltered(filteredSortedProducts);
          setFilterValue(value);
          break;
        case "most-stars":
          filteredSortedProducts.sort((a, b) => b.rating - a.rating);
          setProductFiltered(filteredSortedProducts);
          setFilterValue(value);
          break;
        case "most-price":
          filteredSortedProducts.sort((a, b) => b.price - a.price);
          setProductFiltered(filteredSortedProducts);
          setFilterValue(value);
          break;
        case "least-price":
          filteredSortedProducts.sort((a, b) => a.price - b.price);
          setProductFiltered(filteredSortedProducts);
          setFilterValue(value);
          break;
        default:
          console.log(value);
          break;
      }
    }
  };

  useEffect(() => {
    axiosInstance
      .get("products-list")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const [openKeys, setOpenKeys] = useState([""]);
  const { t } = useTranslation();
  const choices: MenuItem[] = [
    getItem(t("GENDERAGE"), "sub1", [
      getItem(t("MEN"), "1"),
      getItem(t("KIDS"), "2"),
      getItem(t("WOMEN"), "3"),
      getItem(t("BABY"), "4"),
      getItem(t("BIGTALL"), "5"),
    ]),
    getItem(t("FEATURED"), "sub2", [
      getItem("Option 5", "6"),
      getItem("Option 6", "7"),
      getItem("Option 7", "8"),
      getItem("Option 8", "9"),
    ]),
    getItem(t("TRENDING"), "sub3", [
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
    getItem(t("DEPARTMENT"), "sub4", [
      getItem("Option 13", "13"),
      getItem("Option 2", "14"),
      getItem("Option 3", "15"),
      getItem("Option 4", "16"),
    ]),
    getItem(t("PERSONALIZED"), "sub5", [
      getItem("Option 5", "17"),
      getItem("Option 6", "18"),
    ]),
    getItem(t("PLAYERS"), "sub6", [
      getItem("Option 9", "19"),
      getItem("Option 10", "20"),
      getItem("Option 11", "21"),
      getItem("Option 12", "22"),
    ]),
  ];

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handlePageChange = (page: number) => {
    const productsContainer = document.getElementById("products-container");
    if (productsContainer) {
      productsContainer.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const getImageForProduct = (productId: number) => {
    const images = [
      matchshirt,
      baby,
      backpack,
      ball,
      cap,
      longshirt,
      shorts,
      tshirt,
    ];

    return images[productId % images.length];
  };

  const totalPages = Math.ceil(
    productFiltered.length === 0
      ? products.length / productsPerPage
      : productFiltered.length / productsPerPage
  );
  const filteredPaginatedProducts = productFiltered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const filterMenuProducts = (filteredAllProducts: Product[]) => {
    switch (filterValue) {
      case "least-stars":
        filteredAllProducts.sort((a, b) => a.rating - b.rating);
        setProductFiltered(filteredAllProducts);
        break;
      case "most-stars":
        filteredAllProducts.sort((a, b) => b.rating - a.rating);
        setProductFiltered(filteredAllProducts);
        break;
      case "most-price":
        filteredAllProducts.sort((a, b) => b.price - a.price);
        setProductFiltered(filteredAllProducts);
        break;
      case "least-price":
        filteredAllProducts.sort((a, b) => a.price - b.price);
        setProductFiltered(filteredAllProducts);
        break;
      default:
        // console.log(filterValue);
        break;
    }
  };

  const handleMenuChange: MenuProps["onSelect"] = ({ selectedKeys }) => {
    let filteredProducts: Product[] = [...products];

    switch (selectedKeys[0]) {
      case "1":
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "Men"
        );
        setProductFiltered(filteredProducts);
        filterMenuProducts(filteredProducts);
        break;
      case "2":
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "Kids"
        );
        setProductFiltered(filteredProducts);
        filterMenuProducts(filteredProducts);
        break;
      case "3":
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "Women"
        );
        setProductFiltered(filteredProducts);
        filterMenuProducts(filteredProducts);
        break;
      case "4":
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "Toys"
        );
        setProductFiltered(filteredProducts);
        filterMenuProducts(filteredProducts);
        break;
      default:
        // console.log(selectedKeys);
        break;
    }
  };

  const accessToken = localStorage.getItem('acces_token');

  const errorElement = document.querySelector(".notaccount");
  const body = document.querySelector("body");
  const background = document.querySelector(".product-back");

  const handleCartError = () => {
    errorElement?.classList.remove('d-none');
    body?.classList.add('overflow-hidden');
    background?.classList.add('d-block');
  }

  const exitCartError = () => {
    errorElement?.classList.add('d-none');
    body?.classList.remove('overflow-hidden');
    background?.classList.remove('d-block');
  }

  return (
    <Element name="shopping">
      <div className="container" id="products-container">
        <div className="aside">
          <Menu
            className="aside-menu"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={choices}
            onSelect={handleMenuChange}
          />
        </div>
        <div className="items">
          <div className="sort-item">
            <p>{t("SORTBY")}:</p>
            <Space wrap />
            <Select
              defaultValue={t("ALL")}
              style={{ width: 130 }}
              onChange={handleChange}
              options={[
                { value: "most-stars", label: t("MOSTSTARS") },
                { value: "least-stars", label: t("LEASTSTARS") },
                { value: "most-price", label: t("MOSTPRICE") },
                { value: "least-price", label: t("LEASTPRICE") },
              ]}
            />
          </div>
          {loading ? (
            <div className="loading">LOADING...</div>
          ) : (
            <>
              <div className="products">
                {productFiltered.length === 0
                  ? paginatedProducts.map((product) => (
                      <div className="product-item">
                        <ProductItem
                          key={product.id}
                          price={product.price}
                          productImg={getImageForProduct(product.id)}
                          rating={product.rating}
                          about={product.description}
                        />
                        <button
                          onClick={ accessToken ? (()=> context?.addToCart(product.id, product)) : handleCartError }
                          className="product-cart"
                        >
                          <img src={blackCart} />
                        </button>
                      </div>
                    ))
                  : filteredPaginatedProducts.map((product) => (
                      <div className="product-item">
                        <ProductItem
                          key={product.id}
                          price={product.price}
                          productImg={getImageForProduct(product.id)}
                          rating={product.rating}
                          about={product.description}
                        />
                        <button
                          onClick={ accessToken ? (()=> context?.addToCart(product.id, product)) : handleCartError }
                          className="product-cart"
                        >
                          <img src={blackCart} />
                        </button>
                      </div>
                    ))}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="product-back d-none"></div>
        <div className="notaccount d-none">
          <p className="header">You must have an account!</p>
          <Link className="link" to="/login" onClick={exitCartError}>Login for add to cart anything</Link>
          <button onClick={exitCartError}>Continue without account</button>
        </div>
      </div>
    </Element>
  );
};
