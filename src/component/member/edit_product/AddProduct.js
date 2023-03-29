import axios from "axios";
import { useEffect, useState } from "react";

function AddProduct() {
	const [itemProduct, setItemProduct] = useState({
		name: "",
		price: "",
		category: "",
		brand: "",
		status: 1,
		sale: "",
		company: "",
		detail: "",
	});
	const [getCategory, setCategory] = useState();
	const [getBrand, setBrand] = useState();
	const [getFile, setFile] = useState();
	const [getAVT, setAVT] = useState();
	const [itemErr, setItemErr] = useState({});
	const [inforlogin, setInfologin] = useState();
	const ktType = ["png", "jpg", "jpeg", "PNG", "JPG"];
	useEffect(() => {
		const tam = localStorage.getItem("inforLogin");
		let inforLogin = JSON.parse(tam);
		setInfologin(inforLogin);
		axios
			.get("http://localhost/laravel/public/api/category-brand")
			.then((res) => {
				// console.log(res.data.category)
				setCategory(res.data.category);
				setBrand(res.data.brand);
			})
			.catch((error) => console.log(error));
	}, []);

	function renderCategory(e) {
		if (getCategory) {
			return getCategory.map((value, key) => {
				return (
					<>
						<option value={value["id"]}>{value["category"]}</option>
					</>
				);
			});
		}
	}
	function renderBrand(e) {
		if (getBrand) {
			return getBrand.map((value, key) => {
				return (
					<>
						<option value={value["id"]}>{value["brand"]}</option>
					</>
				);
			});
		}
	}
	function renderSale(e) {
		if (itemProduct.status == 0) {
			return (
				<>
					<input
						onChange={hanldeIn}
						type="number"
						name="sale"
						placeholder="Nhap gia sale"
						style={{ width: "50%" }}
					/>
				</>
			);
		}
	}
	function hanldeIn(e) {
		const nameIn = e.target.name;
		const value = e.target.value;
		setItemProduct((state) => ({ ...state, [nameIn]: value }));
	}
	function hanldeFile(e) {
		const file = e.target.files;
		setAVT(file);
	}
	function hanldeSubmit(e) {
		e.preventDefault();
		let kt = true;
		const errorsSubmit = {};

		if (itemProduct.name === "") {
			kt = false;
			errorsSubmit.name = "Vui long nhap ten product";
		} else {
			errorsSubmit.name = "";
		}
		if (itemProduct.price === "") {
			kt = false;
			errorsSubmit.price = "Vui long nhap price";
		} else {
			errorsSubmit.price = "";
		}

		if (itemProduct.company === "") {
			kt = false;
			errorsSubmit.company = "Vui long nhap company";
		} else {
			errorsSubmit.company = "";
		}
		if (itemProduct.detail === "") {
			kt = false;
			errorsSubmit.detail = "Vui long nhap detail";
		} else {
			errorsSubmit.detail = "";
		}
		if (!getAVT) {
			kt = false;
			errorsSubmit.avt = "Anh chua duoc upload";
		} else {
			Object.keys(getAVT).map((item, i) => {
				let typeImg = getAVT[item]["name"];
				let sizeImg = getAVT[item]["size"];
				typeImg = typeImg.split(".");
				typeImg = typeImg[1];
				if (!ktType.includes(typeImg)) {
					kt = false;
					errorsSubmit.avt = "file tai len khong dung dinh dang";
				} else {
					if (sizeImg > 1024 * 1024) {
						kt = false;
						errorsSubmit.avt = "kich thuoc anh qua lon";
					} else {
						errorsSubmit.avt = "";
					}
				}
			});
		}

		if (!kt) {
			setItemErr(errorsSubmit);
		} else {
			let config = {
				headers: {
					Authorization: "Bearer " + inforlogin.success.token,
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
			};
			let url = "http://localhost/laravel/public/api/user/add-product";
			const formData = new FormData();
			// formData.append('id_user', inforlogin.Auth["id"]);
			formData.append("name", itemProduct.name);
			formData.append("price", itemProduct.price);
			formData.append("category", itemProduct.category);
			formData.append("brand", itemProduct.brand);
			formData.append("company", itemProduct.company);
			formData.append("detail", itemProduct.detail);
			formData.append("status", itemProduct.status);
			formData.append("sale", itemProduct.sale ? itemProduct.sale : 0);
			Object.keys(getAVT).map((item, i) => {
				formData.append("file[]", getAVT[item]);
			});
			axios.post(url, formData, config).then((res) => {
				if (!res.data.errors) {
					alert("is success");
					setItemErr("");
					// console.log(res.data)
				} else {
					setItemErr(res.data.errors);
				}
			});
		}
	}
	function renderErr() {
		if (Object.keys(itemErr).length > 0) {
			return Object.keys(itemErr).map((keys, index) => {
				return <p key={index}>{itemErr[keys]}</p>;
			});
		}
	}

	return (
		<>
			<div className="signup-form col-sm-12" style={{ float: "right", padding: "0 0 8px 0" }}>
				<h2>Add new product</h2>
				<form onSubmit={hanldeSubmit} encType="multipart/form-data">
					<input onChange={hanldeIn} type="text" name="name" placeholder="name" />
					<input onChange={hanldeIn} type="text" name="price" placeholder="price" />
					<select onChange={hanldeIn} className="select-category" name="category">
						{renderCategory()}
					</select>
					<select onChange={hanldeIn} className="select-brand" name="brand">
						{renderBrand()}
					</select>
					<select
						value={itemProduct.status}
						onChange={hanldeIn}
						className="select-status"
						name="status">
						<option value={1}>New</option>
						<option value={0}>Sale</option>
					</select>
					{renderSale()}
					<input
						onChange={hanldeIn}
						type="text"
						name="company"
						placeholder="Company profile"
					/>
					<input onChange={hanldeFile} type="file" id="files" multiple></input>
					<textarea
						onChange={hanldeIn}
						name="detail"
						rows="11"
						placeholder="detail"></textarea>
					<button type="submit" className="btn btn-default">
						Add
					</button>
					{renderErr()}
				</form>
			</div>
		</>
	);
}

export default AddProduct;
