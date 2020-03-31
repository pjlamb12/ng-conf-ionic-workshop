import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	items = [];
	constructor(private _http: HttpClient, private alertCtrl: AlertController, private modalCtrl: ModalController) {}

	ionViewDidEnter() {
		this.getNewItem().subscribe((response: any) => (this.items = response.results));
	}

	async showAlert() {
		const alert = await this.alertCtrl.create({
			message: 'show an alert',
			subHeader: 'My subHeader',
			header: 'my header',
			buttons: [
				{
					role: 'Cancel',
					text: 'Close',
					handler: () => console.log('button clicked to close alert'),
				},
			],
		});
		alert.present();
	}

	async showModal(item) {
		const modal = await this.modalCtrl.create({
			component: ModalComponent,
			componentProps: { item },
		});

		modal.present();
	}

	getNewItem() {
		return this._http.get('https://randomuser.me/api');
	}

	doRefresh(evt) {
		console.log(evt);
		setTimeout(() => {
			this.getNewItem().subscribe((response: any) => {
				this.items.push(response.results[0]);
				evt.detail.complete();
			});
		}, 2000);
	}
}
