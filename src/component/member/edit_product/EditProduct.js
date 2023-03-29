import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
	let params = useParams();
	const urlImg = "http://localhost/laravel/public/upload/user/product/";
	const ktType = ["png", "jpg", "jpeg", "PNG", "JPG"];
	const [getinforLogin, setInfologin] = useState(); //get token
	const [itemProduct, setItemProduct] = useState({
		name: "",
		price: "",
		category: "",
		brand: "",
		status: "",
		sale: "",
		company: "",
		detail: "",
	});
	const [image, setImage] = useState(); //render image product
	const [getAVT, setAVT] = useState();
	const [avtCheckbox, setAvtCheckbox] = useState("");
	const [itemErr, setItemErr] = useState({});
	useEffect(() => {
		const tam = localStorage.getItem("inforLogin");
		let inforLogin = JSON.parse(tam);
		setInfologin(inforLogin);
		let config = {
			headers: {
				Authorization: "Bearer " + inforLogin.success.token,
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
			},
		};
		axios
			.get("http://localhost/laravel/public/api/user/product/" + params.id, config)
			.then((res) => {
				// console.log(res.data.data)
				setImage(res.data.data["image"]);
				setItemProduct({
					name: res.data.data["name"],
					price: res.data.data["price"],
					category: res.data.data["id_category"],
					brand: res.data.data["id_brand"],
					status: res.data.data["status"],
					sale: res.data.data["sale"],
					company: res.data.data["company_profile"],
					detail: res.data.data["detail"],
					id_user: res.data.data["id_user"],
				});
				// setProduct(res.data.data)
			})
			.catch((error) => console.log(error));
	}, []);
	function renderCategory(e) {
		// console.log(itemProduct.category)
		if (itemProduct.category == 1) {
			return (
				<>
					<option value={itemProduct.category}>Category1</option>
					<option value={itemProduct.category}>Category2</option>
					<option value={itemProduct.category}>VietNam</option>
				</>
			);
		} else {
			if (itemProduct.category == 2) {
				return (
					<>
						<option value={itemProduct.category}>Category2</option>
						<option value={itemProduct.category}>Category1</option>
						<option value={itemProduct.category}>VietNam</option>
					</>
				);
			} else {
				if (itemProduct.category == 3) {
					return (
						<>
							<option value={itemProduct.category}>VietNam</option>
							<option value={itemProduct.category}>Category1</option>
							<option value={itemProduct.category}>Category2</option>
						</>
					);
				}
			}
		}
	}
	function renderBrand(e) {
		// console.log(itemProduct.brand)
		if (itemProduct.brand == 1) {
			return <option value={itemProduct.brand}>Brand1</option>;
		} else {
			if (itemProduct.brand == 2) {
				return <option value={itemProduct.brand}>Brand2</option>;
			}
		}
	}
	function renderStatus(e) {
		if (itemProduct.status == 0) {
			return (
				<>
					<option value={0}>Sale</option>
					<option value={1}>New</option>
				</>
			);
		} else {
			return (
				<>
					<option value={1}>New</option>
					<option value={0}>Sale</option>
				</>
			);
		}
	}
	function renderSale(e) {
		if (itemProduct.status == 0) {
			return (
				<>
					<input
						type="number"
						name="sale"
						placeholder="Nhap gia sale"
						style={{ width: "50%" }}
						value={itemProduct.sale}
					/>
				</>
			);
		}
	}
	function renderImgProduct(e) {
		// console.log(image)
		if (image) {
			// console.log(urlImg + getinforLogin.Auth["id"]+ '/' + image)
			return image.map((value, key) => {
				return (
					<div style={{ width: "200px" }}>
						<a href="">
							<img
								style={{ width: "100px", height: "90px" }}
								src={urlImg + itemProduct.id_user + "/" + value}
								alt="img"
							/>
						</a>
						<input
							name="checkBox"
							onClick={clickCheckbox}
							type="checkbox"
							style={{ maxWidth: "10%" }}
							value={value}
						/>
					</div>
				);
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

	function hanldeIn(e) {
		const nameIn = e.target.name;
		const value = e.target.value;
		setItemProduct((state) => ({ ...state, [nameIn]: value }));
	}
	function hanldeFile(e) {
		const file = e.target.files;
		setAVT(file);
	}
	function clickCheckbox(e) {
		let checked = e.target.checked;
		let value = e.target.value;
		if (checked) {
			setAvtCheckbox((state) => [...state, value]);
		} else {
			const filterArr = avtCheckbox.filter(function (e) {
				return e != value;
			});
			setAvtCheckbox(filterArr);
		}
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
					Authorization: "Bearer " + getinforLogin.success.token,
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
			};
			let urlApi = "http://localhost/laravel/public/api/user/edit-product/" + params.id;
			const formData = new FormData();
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
			if (avtCheckbox) {
				avtCheckbox.map((value, key) => {
					formData.append("avatarCheckBox[]", value);
				});
			}
			axios.post(urlApi, formData, config).then((res) => {
				// console.log(res.data)
				if (!res.data.errors) {
					alert("is success");
					setItemErr("");
				} else {
					setItemErr(res.data.errors);
				}
			});
		}
	}

	return (
		<>
			<div className="signup-form col-sm-12" style={{ float: "right", padding: "0 0 8px 0" }}>
				<h2>Editproduct</h2>
				<form encType="multipart/form-data" onSubmit={hanldeSubmit}>
					<input
						onChange={hanldeIn}
						type="text"
						name="name"
						placeholder="name"
						value={itemProduct.name}
					/>
					<input
						onChange={hanldeIn}
						type="text"
						name="price"
						placeholder="price"
						value={itemProduct.price}
					/>
					<select onChange={hanldeIn} className="select-category" name="category">
						{renderCategory()}
					</select>
					<select onChange={hanldeIn} className="select-brand" name="brand">
						{renderBrand()}
						<option value={itemProduct.brand}>Brand1</option>
					</select>
					<select onChange={hanldeIn} className="select-status" name="status">
						{renderStatus()}
					</select>
					{renderSale()}
					<input
						onChange={hanldeIn}
						type="text"
						name="company"
						placeholder="Company profile"
						value={itemProduct.company}
					/>
					<input onChange={hanldeFile} type="file" id="files" multiple></input>
					<div className="col-sm-12" style={{ display: "flex" }}>
						{renderImgProduct()}
					</div>
					<textarea
						name="detail"
						rows="11"
						placeholder="detail"
						value={itemProduct.detail}></textarea>
					<button type="submit" className="btn btn-default">
						Xac nhan
					</button>
					{renderErr()}
				</form>
			</div>
		</>
	);
}

export default EditProduct;
