"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkActiveShiftService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const checkActiveShiftService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cashierId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!cashierId) {
            return res.status(400).json({ message: "No cashier ID found" });
        }
        const activeShift = yield prisma_1.default.shift.findFirst({
            where: {
                cashierId,
                endedAt: null,
                isActive: true,
            },
        });
        if (activeShift) {
            return res.status(200).json({
                hasActiveShift: true,
                data: activeShift,
            });
        }
        else {
            return res.status(200).json({
                hasActiveShift: false,
            });
        }
    }
    catch (error) {
        console.error("Check active shift error:", error);
        next(error);
    }
});
exports.checkActiveShiftService = checkActiveShiftService;
