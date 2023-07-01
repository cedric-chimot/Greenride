<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

\Stripe\Stripe::setApiKey('sk_test_51NIpbkHGmb7AiX8Y85aXJopO4lc5suKyYpH1I8obLwrLTgR0J2hTh7VkpoIsUXuvHY8VsW2qqxT03FqQdc1UrvtM006yQYb8QE');



class StripeController extends AbstractController
{
    #[Route('/stripe/payment/{amount}', name: 'app_payment_handler')]
    public function paymentHandler(int $amount): Response
    {
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => $amount*100,
            'currency' => 'eur',
            'payment_method_types' => [
                'card'
            ],
        ]);

        $output = [
            'clientSecret' => $paymentIntent->client_secret,
        ];
        return $this->json($output);
    }
}
