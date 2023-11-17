import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  cardForm: FormGroup;
  submitter: boolean = false;
  isSending: boolean = false;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private ARoute: ActivatedRoute
  ) {
    this.id = this.ARoute.snapshot.paramMap.get('id');
    this.cardForm = this.fb.group({
      card_number: ['',[Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(16)]],
      expiration_date: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(22|23|24|25|26|27|28)$/)]],
      owner_name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]{1,20}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
    });
  }

  ngOnInit(): void {
    this.onEdit();
  }

  onSubmit() {
    this.submitter = true;
    this.isSending = true;
    if (this.cardForm.invalid) {
      return;
    }
    const card: Card = { ...this.cardForm.value };
    this.cardService.addCard(card).then(() => {
      this.isSending = false;
      this.router.navigate(['/otra-pagina']);
    });
  }

  onEdit() {
    if (this.id !== null) {
      this.cardService.getCard(this.id).subscribe((data) => {
        this.cardForm.setValue({
          card_number: data.payload.data()['card_number'],
          expiration_date: data.payload.data()['expiration_date'],
          owner_name: data.payload.data()['owner_name'],
          cvv: data.payload.data()['cvv'],
        });
      });
    }
  }

  onUpdate() {
    this.submitter = true;
    this.isSending = true;
    if (this.cardForm.invalid || this.id == null) {
      return;
    }
    const card: Card = { ...this.cardForm.value };
    this.cardService.updateCard(this.id, card).then(() => {
      this.isSending = false;
      this.router.navigate(['/']);
    });
  }

  onSave() {
    if (this.id !== null) {
      this.onUpdate();
    } else {
      this.onSubmit();
    }
  }

  get isExpirationDateFocused(): boolean {
    const expirationDateInput = document.getElementById(
      'expiration_date'
    ) as HTMLInputElement;
    return document.activeElement !== expirationDateInput;
  }

  get isAnyFieldNotSet(): boolean {
    return (
      (this.cardForm.get('card_number')?.hasError('required') ?? false) ||
      (this.cardForm.get('expiration_date')?.hasError('required') ?? false) ||
      (this.cardForm.get('owner_name')?.hasError('required') ?? false) ||
      (this.cardForm.get('cvv')?.hasError('required') ?? false)
    );
  }

  onInput() {
    if (this.submitter) this.submitter = false;
  }
}
