import axios from 'axios';

export default class AccountService {

    getAccount() {
		return axios.get('http://127.0.0.1:8000/api/accounts/').then(res => res.data.data);
	}

	updateAccounts(id, newStatus) {
		let stats = JSON.stringify({status: newStatus})
		return axios.patch(`http://127.0.0.1:8000/statistics/count/${id}/`,stats, {headers: {'Content-Type': 'application/json'}}).then(res => res.data);

    }
	getList() {
		return axios.get('http://127.0.0.1:8000/statistics/prefix/').then(res => res.data);
	}
	// getList() {
	// 	return axios.get('http://127.0.0.1:8000/api/contents/').then(res => res.data.data);
	// }
	addList(newItems) {
		console.log(newItems);
		let data = { prefix: newItems, content: "" };

		return axios.post('http://127.0.0.1:8000/api/contents/' ,data, {headers: {'Content-Type': 'application/json'}}).then(res => res.data);
	}

}