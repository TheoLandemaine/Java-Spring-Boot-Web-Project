package com.codingfactory.porare.web;


import java.util.List;

import com.codingfactory.porare.service.CardService;
import com.codingfactory.porare.service.LoginService;
import com.codingfactory.porare.service.PackService;
import org.springframework.web.bind.annotation.*;

import com.codingfactory.porare.data.User;
import com.codingfactory.porare.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/")
public class PorareRestController {

    private final UserService userService;
    private final LoginService loginService;
    private final CardService cardService;
    private final PackService packService;

    public PorareRestController(UserService personService, LoginService loginService, CardService cardService, PackService packService) {
        this.userService = personService;
        this.loginService = loginService;
        this.cardService = cardService;
        this.packService = packService;
    }


    @GetMapping("users")
    public List<User> getUsers() {
        /*
        * Return @List<User>
        * List of all users
        */
        return userService.getAllUsers();
    }

    @PostMapping("getUserInformations")
    public List<User> getUserInformations(@RequestParam String token, // Get username from the request
                                    HttpServletRequest httpServletRequest) {

        /*
        * Return @User
        * User informations
        */
        return userService.getUserInformations(token); // Return Result
    }

    @PostMapping("getUserCoins")
    public int getUserCoins(@RequestParam String token, // Get username from the request
                            HttpServletRequest httpServletRequest) {

        /*
        * Return @int
        * User coins
        */
        return userService.getUserCoins(token); // Return Result
    }

    @PostMapping("register")
    public String register(@RequestParam String username, // Get username from the request
                           @RequestParam String email, // Get email from the request
                           @RequestParam String password, // Get password from the request
                           @RequestParam String confirmPassword, // Get confirm password from the request
                           HttpServletRequest httpServletRequest) {

        /*
        * Return @Boolean
        * true if the registration is successful
        * false if the registration is not successful
        */
        return loginService.registerUser(username, email, password, confirmPassword); // Return Result
    }


    @PostMapping("login")
    public String login(@RequestParam String email, // Get username from the request
                        @RequestParam String password, // Get password from the request
                        HttpServletRequest httpServletRequest) {

        /*
        * Return @Boolean
        * true if the login is successful
        * false if the login is not successful
        */
        return loginService.loginUser(email, password); // Return Result
    }

    @PostMapping("getPacks")
        public List<String> getPacks(@RequestParam String token, // Get username from the request
                                 HttpServletRequest httpServletRequest) {

        /*
        * Return @List<String>
        * List of all packs
        */
        return userService.getUserPacks(token); // Return Result
    }

    @PostMapping("buyPack")
    public boolean buyPack( // Get username from the request
                            @RequestParam String token,// Get pack price from the request
                            @RequestParam String packType,// Get pack type from the request
                            @RequestParam int packPrice,
                            HttpServletRequest httpServletRequest) {
        /*
        * Return @Boolean
        * true if the buying is successful
        * false if the buying is not successful
        */
        return packService.addPack(token, packType, packPrice); // Return Result
    }

    @PostMapping("deletePack")
    public boolean deletePack( // Get username from the request
                               @RequestParam String token,// Get pack price from the request
                               @RequestParam String packType,// Get pack type from the request
                               HttpServletRequest httpServletRequest) {

        /*
        * Return @Boolean
        * true if the buying is successful
        * false if the buying is not successful
        */
        return packService.deletePack(packType, token); // Return Result
    }

    @PostMapping ("saveCards")
    public boolean saveCards(@RequestParam String token,
                             @RequestParam String cardId,
                             HttpServletRequest httpServletRequest) {
        System.out.println("cardId: " + cardId);
        return cardService.addCard(token, cardId);
    }

    @PostMapping("getCards")
    public List<String> getCards(@RequestParam String token,
                                 HttpServletRequest httpServletRequest) {
        return userService.getUserCards(token);
    }

    @PostMapping("deleteCard")
    public boolean deleteCard(@RequestParam String token,
                             @RequestParam String cardId,
                             @RequestParam String cardType,
                             HttpServletRequest httpServletRequest) {
        return cardService.deleteCard(token, cardId, cardType);
    }

    @PostMapping("getPackPrice")
    public int getPackPrice(@RequestParam String packType,
                            HttpServletRequest httpServletRequest) {

        return packService.getPackPrice(packType);
    }

    @PostMapping("getCardPrice")
    public int getCardPrice(@RequestParam String cardType,
                            HttpServletRequest httpServletRequest) {

        return cardService.getCardPrice(cardType);
    }


}


