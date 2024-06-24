import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputOtpModule } from 'primeng/inputotp';
import { Observable, Subscription, catchError, switchMap, tap, throwError, timer } from 'rxjs';
import { loginRegister } from '../../models/loginRegister.models';
import { LoginRegisterService } from '../../services/loginRegister.services';
import { DashboardService } from '../../services/dashboard.services';
import { logout } from '../../models/logout.models';
import { vaultListe } from '../../models/vaultList.models';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { secretkey } from '../../models/secretkey.models';
import { infoCoffre } from '../../models/infoCoffre.models';
import { DialogModule } from 'primeng/dialog';
import { newVault } from '../../models/newVault.models';
import { DropdownModule } from 'primeng/dropdown';
import { categorie, categories } from '../../models/categories.models';
import { addCategorie } from '../../models/addCategorie.models';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    RouterOutlet,
    InputTextModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    RouterLink,
    MessagesModule,
    InputOtpModule,
    TableModule,
    SidebarModule,
    DialogModule,
    DropdownModule
  ],
  providers: [MessageService, BrowserModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  loginData!: loginRegister;
  infoCoffre!: infoCoffre;
  newVault!: newVault;
  listCategories!: categorie[];
  listelibCategorie!: string[];
  listeidCategorie!: string[];
  sidebarVisible = false;
  addMenuVault = false;
  edit = false;
  visibleAddCategorie = false;
  newCategorie = "";

  constructor(private loginRegisterService: LoginRegisterService,
    private dashboardService: DashboardService,
    private router: Router,
    private messageService: MessageService
  ) {
  }
  vaultListe: Array<vaultListe> = []
  ngOnInit(): void {

    this.loginData = this.loginRegisterService.getLoginData();  // Récupérer les données de connexion
    console.log(this.loginData)
    this.dashboardService.ShowAllVault(this.loginData.access_token).subscribe({
      next: (response: vaultListe[]) => {

        this.vaultListe = response;
      }
    },
    )
  }

  disconnect(acces_token: string) {
    this.dashboardService.disconnect(acces_token).subscribe({
      next: (response: logout) => {

        console.log('Authentification successful', response);
        this.router.navigate(['/']);

      },
      error: (error) => {
        console.error('Authentification error', error);
      },
    });


  }

  InfoCoffre(uuidCoffre: string) {
    this.dashboardService.SecretKey(uuidCoffre, this.loginData.access_token).pipe(
      switchMap((secretkey: secretkey) => {
        if (secretkey) {
          return this.dashboardService.getInfoCoffre(uuidCoffre, secretkey.key, this.loginData.access_token).pipe(
            tap((infoCoffre: infoCoffre) => {
              this.infoCoffre = infoCoffre;
              this.sidebarVisible = true;
            })
          );
        } else {
          // Gérer le cas où secretkey est null
          return throwError('La clé secrète est null');
        }
      }),
      catchError(error => {
        console.error('Erreur:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  AddVault() {
    this.addMenuVault = true;
    this.dashboardService.getCategorie(this.loginData.access_token).subscribe({
      next: (response: categories) => {

        this.listCategories = response.categories;
        this.listCategories.forEach(categorie => {
          this.listelibCategorie.push(categorie.libCategorie)
          this.listeidCategorie.push(categorie.idCategorie)
          console.log(this.listCategories)
        });

      }
    },
    )
  }

  showAddCategorie() {
    this.visibleAddCategorie = true;
  }

  addNewCategorie() {
    this.dashboardService.addNewCategorie(this.loginData.access_token, this.newCategorie).subscribe({
      next: (response: addCategorie) => {
        console.log(response.status)

        this.visibleAddCategorie = false;
        this.messageService.add({ severity: 'success', summary: 'Nouvelle Catégorie', detail: 'Un nouvelle catégorie à été ajouté ' });



      },
      error: (error) => {
        console.error('Authentification error', error);
      },
    })
  }

  onSidebarHide() {
    this.sidebarVisible = false
  }
  onSave() {
    // Implement save functionality here
    console.log('Save', this.infoCoffre);
  }

  onCancel() {
    // Implement cancel functionality here
    this.sidebarVisible = false;
  }

  editVault() {
    this.edit = true;
  }
}