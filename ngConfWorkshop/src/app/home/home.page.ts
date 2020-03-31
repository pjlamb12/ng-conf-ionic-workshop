import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	items = [];
	location;
	photo: string;
	constructor(private _http: HttpClient, private alertCtrl: AlertController, private modalCtrl: ModalController) {}

	async ngOnInit() {
		const { Geolocation } = Plugins;
		Geolocation.getCurrentPosition().then((results: any) => {
			console.log(results);
			this.location = results;
		});
	}

	async ionViewDidEnter() {
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

	async takePhoto() {
		const { Camera } = Plugins;
		const image = await Camera.getPhoto({
			quality: 100,
			allowEditing: false,
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Camera,
		});
		this.photo = image.dataUrl;
	}
}
