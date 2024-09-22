<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use Otp;

class EmailVerifactionNotification extends Notification
{
    use Queueable;

    public $otp;
    public $fromEmail;
    public $subject;
    public $message;
    public $mailer;

    public function __construct()
    {
        $this->message = 'Please verify your email address.';
        $this->subject = 'Email Verification';
        $this->fromEmail = 'support@jehad.pro';
        $this->mailer = "smtp";

        $this->otp = new Otp();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $code = $this->otp->generate($notifiable->email, 6, 15);
        return (new MailMessage)
            ->mailer('smtp')
            ->subject($this->subject)
            ->greeting('Hello!')
            ->line($this->message)
            ->line('Use this code for login: ' . $code->token);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}